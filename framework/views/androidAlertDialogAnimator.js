
/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('AndroidAlertDialogAnimator', function(DialogAnimator) {

    /**
     * Android style animator for alert dialog.
     */
    var AndroidAlertDialogAnimator = DialogAnimator.extend({

      timing: 'cubic-bezier(.1, .7, .4, 1)',
      duration: 0.2, 

      init: function(options) {
        options = options || {};

        this.timing = options.timing || this.timing;
        this.duration = options.duration !== undefined ? options.duration : this.duration;
      },

      /**
       * @param {Object} dialog
       * @param {Function} callback
       */
      show: function(dialog, callback) {
        callback = callback ? callback : function() {};

        animit.runAll(

          animit(dialog._mask[0])
            .queue({
              opacity: 0
            })
            .queue({
              opacity: 1.0
            }, {
              duration: this.duration,
              timing: this.timing
            }),

          animit(dialog._dialog[0])
            .queue({
              css: {
                transform: 'translate3d(-50%, -50%, 0) scale3d(0.9, 0.9, 1.0)',
                opacity: 0.0
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3d(-50%, -50%, 0) scale3d(1.0, 1.0, 1.0)',
                opacity: 1.0
              },
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle()
            .queue(function(done) {
              callback();
              done();
            })
        );
      },

      /**
       * @param {Object} dialog 
       * @param {Function} callback
       */
      hide: function(dialog, callback) {
        callback = callback ? callback : function() {};

        animit.runAll(

          animit(dialog._mask[0])
            .queue({
              opacity: 1.0
            })
            .queue({
              opacity: 0
            }, {
              duration: this.duration,
              timing: this.timing
            }),

          animit(dialog._dialog[0])
            .queue({
              css: {
                transform: 'translate3d(-50%, -50%, 0) scale3d(1.0, 1.0, 1.0)',
                opacity: 1.0
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3d(-50%, -50%, 0) scale3d(0.9, 0.9, 1.0)',
                opacity: 0.0
              },
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle()
            .queue(function(done) {
              callback();
              done();
            })

        );
      }
    });

    return AndroidAlertDialogAnimator;
  });

})();

