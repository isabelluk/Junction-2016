import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Cards } from '../api/cards.js';
import { Tracker } from 'meteor/tracker'

import './body.html';

var stream;

var stopStream = function(st) {
  if(!st) {
    return;
  }

  if(st.stop) {
    st.stop();
    return;
  }

  if(st.getTracks) {
    var tracks = st.getTracks();
    for(var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      if(track && track.stop) {
        track.stop();
      }
    }
  }
};
/*
Tracker.autorun(function (c) {
  if (Session.equals("video", false)){
    try {
      stopStream(stream);
      document.getElementById("#videoElement").hide();
    } catch(e) { console.log(e); }
  }
  else
    document.getElementById("#videoContainer").show();

});
*/
Template.body.onCreated(function bodyOnCreated(){
  this.path = new ReactiveDict();
  //Session.set('video', false);
  //this.path.set('length',0);
  //this.path.set('photo',null);
});

Template.body.helpers({
  cards() {
    return Cards.find();
  },
  'photo': function(){
    return Session.get('photo');
  },
  'video': function(){
    return Session.get('video');
  },
});

Template.body.events({
  'click .button-dialog-add-card'(event) {
    const dialog = document.getElementById("dialog-add-card");
    dialog.showModal();
    //not working $("#dialog-add-card").showModal();
  },
  'click #add-photo'(event) {
    $("#videoElement").show();
    $("#add-photo").hide();
    event.preventDefault();
    Session.set('video', true);
    var video = document.querySelector("#videoElement");
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, handleVideo, videoError);
    }
    function handleVideo(st) {
        video.src = window.URL.createObjectURL(st);
        stream = st;
    }
    function videoError(e) {
        // do something
    }

  },

  'click #videoElement'(event) {
    var video = document.getElementById('videoElement');
    var canvas = document.getElementById('canvas');
    var width = $("#videoElement").innerWidth();
    canvas.width = $("#videoElement").innerWidth();
    var height = $("#videoElement").innerHeight();
    canvas.height = $("#videoElement").innerHeight();
    console.log(width +" "+ height+" ");
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    $("#canvas").show();
    //var data = canvas.toDataURL('image/webp');
    //console.log(data);
    //document.getElementById('photo').setAttribute('src', data);
    //$("#photo").show();
    stopStream(stream);
    $("#videoElement").hide();
    //$("#add-photo").show();
  },

  'submit #dialog-add-card, click #add-card'(event,instance) {
    event.preventDefault();
    const dialog = document.getElementById("dialog-add-card");
    //let title = document.getElementById('title');
    let text = document.getElementById('text');
    stopStream(stream);
    $("#videoElement").hide();
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $("#canvas").hide();
    $("#add-photo").show();
    //console.log(canvas.toDataURL('image/png'));
    //let picture = ;
    Cards.insert({
      text: text.value,
      picture: canvas.toDataURL("image/webp",1) +"=",
      createdAt: new Date(), // current time
    });
    //use parent in the future
    dialog.close();
    //delete old data in fields
    text.value = '';

  },
  'click #close'(event) {
    //use parent in the future

    const dialog = document.getElementById("dialog-add-card");
    dialog.close();

    stopStream(stream);
    $("#videoElement").hide();
    var canvas= document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $("#canvas").hide();
    $("#add-photo").show();
  },
  'click .delete'() {
    Meteor.call('body.remove', this._id);
  },
  'click .open-card'(event, instance) {
    //const length = instance.path.get('length');
    //Depth starts with 0
    let cardInfo = {id:this._id,title:this.title};
    //instance.path.set(length, cardInfo);
    //instance.path.set('length', length +1);
  },

});
