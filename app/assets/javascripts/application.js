// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).ready(function(){
  $("div#myId").dropzone({ url: "/homes/add_image" });
});

Dropzone.options.myId = {
  maxFiles: 1,
  //addRemoveLinks: true,
  previewTemplate: "<div class=\"dz-preview dz-file-preview\"> <div class=\"dz-details\"> <img data-dz-thumbnail style=\"margin: 50px;\"/> </div> </div>",
  maxfilesexceeded: function(file) {
        this.removeAllFiles();
        this.addFile(file);
  },
  success: function(file, response){
    // alert(response.image);
    if(response.image_id != undefined)
      {
        $('#imageId').val(response.image_id);
        $('img').attr('src',response.image_path)
      }
    else
    	{
        this.removeAllFiles();
        $('#imageId').val("");
        alert(response.error);
      }
  },

  init: function() {
      this.on("addedfile", function(file) {

        // Create the remove button
        var removeButton = Dropzone.createElement("<button>Remove file</button>");


        // Capture the Dropzone instance as closure.
        var _this = this;

        // Listen to the click event
        removeButton.addEventListener("click", function(e) {
          e.preventDefault();
          e.stopPropagation();

          // Remove the file preview.
          _this.removeFile(file);
          $.ajax({
            type: 'GET',
            url: '/homes/remove_image',
            data:{
              'image_id': $('#imageId').val()
            },
            error: function(){},
            success: function(){},
            complete: function (){}
          });
          $('#imageId').val("");
        });

        // Add the button to the file preview element.
        file.previewElement.appendChild(removeButton);
      });
    }
  
};


