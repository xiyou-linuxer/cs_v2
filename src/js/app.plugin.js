(function ($) {
  'use strict'

  $(function () {
    // sparkline
    var sr
    var sparkline = function ($re) {
      $('.sparkline').each(function () {
        var $data = $(this).data()

        if ($re && !$data.resize) {
          return
        }

        if (($data.type === 'pie') && $data.sliceColors) {
          $data.sliceColors = JSON.parse($data.sliceColors)
        }

        if (($data.type === 'bar') && $data.stackedBarColor) {
          $data.stackedBarColor = JSON.parse($data.stackedBarColor)
          $data.valueSpots = {'0:': $data.spotColor}
          $(this).sparkline('html', $data)
        }
      })
    }

    $(window).resize(function () {
      clearTimeout(sr)
      sr = setTimeout(function () {
        sparkline(true)
      }, 500)
    })
    sparkline(false)

    // easypie
    var easypie = function () {
      $('.easypiechart').each(function () {
        var $value = 0
        var $this = $(this)
        var $data = $this.data()
        var $step = $this.find('.step')
        var $targetValue = parseInt($($data.target).text())

        $data.barColor = $data.barColor || (function ($percent) {
          $percent /= 100

          return 'rgb(' + Math.round(200 * $percent) +
              ', 200, ' + Math.round(200 * (1 - $percent)) + ')'
        })

        $data.onStep =  function (value) {
          $value = value
          $step.text(parseInt(value))

          if ($data.target) {
            $($data.target).text(parseInt(value) + $targetValue)
          }
        }

        $data.onStop =  function () {
          $targetValue = parseInt($($data.target).text())
          if ($data.update) {
            setTimeout(function () {
              $this.data('easyPieChart').update(100 - $value)
            }, $data.update)
          }
        }

        $(this).easyPieChart($data)
      })
    }

    easypie()

    // datepicker
    $('.datepicker-input').each(function () {
      $(this).datepicker()
    })

    // dropfile
    $('.dropfile').each(function () {
      var $dropbox = $(this)

      if (typeof window.FileReader === 'undefined') {
        $('small', this)
        .html('File API & FileReader API not supported')
        .addClass('text-danger')
        return
      }

      this.ondragover = function () {
        $dropbox.addClass('hover')
        return false
      }

      this.ondragend = function () {
        $dropbox.removeClass('hover')
        return false
      }

      this.ondrop = function (e) {
        e.preventDefault()
        $dropbox.removeClass('hover').html('')

        var reader = new FileReader()
        var file = e.dataTransfer.files[0]

        reader.onload = function (event) {
          $dropbox.append($('<img>').attr('src', event.target.result))
        }

        reader.readAsDataURL(file)
        return false
      }
    })

    // slider
    $('.slider').each(function () {
      $(this).slider()
    })

    // sortable
    if ($.fn.sortable) {
      $('.sortable').sortable()
    }

    /*
    // slim-scroll
    $('.no-touch .slim-scroll').each(function () {
      var $self = $(this)
      var $data = $self.data()
      var $slimResize

      $self.slimScroll($data)
      $(window).resize(function () {
        clearTimeout($slimResize)
        $slimResize = setTimeout(function () {
          $self.slimScroll($data)
        }, 500)
      })
      $(document).on('updateNav', function () {
        $self.slimScroll($data)
      })
    })
    */

    // docs
    $('#docs pre code').each(function () {
      var $this = $(this)
      var t = $this.html()

      $this.html(t.replace(/</g, '&lt').replace(/>/g, '&gt'))
    })

    // table select/deselect all
    $(document).on('change', 'table thead [type="checkbox"]', function (e) {
      if (e) {
        e.preventDefault()
      }

      var $table = $(e.target).closest('table')
      var $checked = $(e.target).is(':checked')

      $('tbody [type="checkbox"]', $table).prop('checked', $checked)
    })

    // random progress
    $(document).on('click', '[data-toggle^="progress"]', function (e) {
      if (e) {
        e.preventDefault()
      }

      var $el = $(e.target)
      var $target = $($el.data('target'))

      $('.progress', $target).each(function () {
        var $data
        var $max = 50
        var $ps = $('.progress-bar', this).last()

        if ($(this).hasClass('progress-xs') ||
          $(this).hasClass('progress-sm')) {
          $max = 100
        }

        $data = Math.floor(Math.random() * $max) + '%'
        $ps.css('width', $data).attr('data-original-title', $data)
      })
    })

    // chosen
    if ($('.chosen-select').length) {
      $('.chosen-select').chosen()
    }
  })
})(window.jQuery)
