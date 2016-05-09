/**
 * Cargo POPUP Plugins
 *
 * @author Luc Duong (luc.duong@dounets.com)
 * Created by luc on May 05, 2016.
 */
(function ($) {
    var $panelWrapper = $('<div>');
    var $panel = $("<div style='position: relative; width: 100%; height: 100%;'>");
    var defaults = {
        css: {
            position: 'absolute',
            width: '400px',
            height: '100%',
            background: '#62676e',
            top: '36px',
            right: '0',
            'border-left': '1px solid #3277b3'
        },
        event: {
            click: undefined
        },
        data: []
    };
    var settings = {};

    /**
     * Initial Cargo Popup with options
     *
     * @param options
     * @returns {jQuery}
     */
    $.fn.cargoPopup = function (options) {
        $(this).css('position', 'relative');
        settings = $.extend(defaults, options);

        // Apply POPUP CSS
        var properties = settings.css;
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                $panelWrapper.css(property, properties[property]);
            }
        }

        $panelWrapper.attr('id', 'cargo-popup')
            .addClass('cargo-popup');
        $panelWrapper.css('z-index', 999);
        $panelWrapper.append($panel);
        $(this).append($panelWrapper);
        $panelWrapper.css('margin-right', '-' + settings.css.width);
        $panelWrapper.append($panel);

        // Bind data
        var data = settings.data;
        if (!data)
            return this;

        return this;
    };

    /**
     * Set the popup content
     * Ex:
     *  <pre>
     *      $htmlContent = $('<div>');
     *      $cargoPopup.htmlContent($htmlContent);
     *  </pre>
     * @param html
     */
    $.fn.htmlContent = function (html) {
        $panel.html('');
        $panel.append(html);
    };


    /**
     * Configure the popup information
     *
     * @param options
     * @returns {jQuery}
     */
    $.fn.config = function(options) {
        if (!options)
            return this;
        var properties = options;
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                settings[property] = properties[property];
            }
        }
        return this;
    };

    /**
     * Bind data to popup.
     * The parameter is optional.
     * Ex:
     * <pre>
     *     var data = [['Header', 'Data'], [['Header 1', 'Data 1'], ...];
     *     $cargoPopup.bindData(data);
     * </pre>
     *
     * @param data (Optional)
     */
    $.fn.bindData = function(data) {
        if (data) {
            settings.data = data;
        }

        var $table = createDefaultTable(settings.data);
        $panel.html('');
        $panel.append($table);
        return this;
    };

    /**
     * Add data to default view
     *
     * @param row
     * @returns {jQuery}
     */
    $.fn.addRow = function(row) {
        return this;
    };

    /**
     * Add many data to default view
     *
     * @param rows
     * @returns {jQuery}
     */
    $.fn.addRows = function(rows) {
        return this;
    };

    /**
     * Just show the popup without animation
     *
     */
    /*$.fn.show = function () {
        $panelWrapper.addClass('open');
        $panelWrapper.removeClass('hide');
    };*/

    /**
     * Just hide the popup without animation
     *
     */
    /*$.fn.hide = function () {
        $panelWrapper.addClass('hide');
        $panelWrapper.removeClass('open');
    };*/

    /**
     * Show or hide popup with animation
     *
     * @param flag (true|false)
     */
    $.fn.showWithAnimation = function(flag) {
        $panelWrapper.animate({width: (flag ? '+=' : '-=') + settings.css.width});
    };

    /**
     * Create default table view
     *
     * @param data
     * @returns {HTMLElement}
     */
    var createDefaultTable = function(data) {
        if (!data)
            return $('<table>');
        var $table = $('<table>');
        var $tbBody = $('<tbody>');
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            var $row = $('<tr>');
            var $headerCol = $('<td>');
            var $dataCol = $('<td>');
            $headerCol.html(row[0]);
            $dataCol.html(row[1]);
            $row.append($headerCol)
                .append($dataCol);
            $tbBody.append($row);
        }
        $table.append($tbBody);
        return $table;
    };
}(jQuery));
