import Color from '../util/Color'
import Dom from '../util/Dom'
import Event from '../util/Event'
import EventMachin from '../util/EventMachin'

import ColorControl from './ColorControl'
import ColorInformation from './ColorInformation'
import ColorPalette from './ColorPalette'
import ColorSetsChooser from './ColorSetsChooser'
import ColorSetsList from './ColorSetsList'
import CurrentColorSets from './CurrentColorSets'
import CurrentColorSetsContextMenu from './CurrentColorSetsContextMenu'

export default class ColorPicker extends EventMachin {
    constructor(opt) {
        super();

        this.opt = opt || {};
        this.$body = null;
        this.$root = null;

        this.format = 'rgb';
        this.currentA = 0;
        this.currentH = 0;
        this.currentS = 0;
        this.currentV = 0;
        
        this.colorSetsList = new ColorSetsList(this);
        this.colorpickerCallback = function () { };

        this.isColorPickerShow = false;
        this.isShortCut = false;
        this.hideDelay = this.opt.hideDeplay || 2000;
        this.timerCloseColorPicker;
        this.autoHide = this.opt.autoHide || true;

        this.control = new ColorControl(this);
        this.palette = new ColorPalette(this);
        this.information = new ColorInformation(this);
        this.colorSetsChooser = new ColorSetsChooser(this);
        this.currentColorSets = new CurrentColorSets(this);
        this.contextMenu = new CurrentColorSetsContextMenu(this, this.currentColorSets);

        this.initialize();
    }

    getOption(key) {
        return this.opt[key];
    }

    isType (key) {
        return this.getOption('type') == key;
    }

    isPaletteType() {
        return this.isType('palette');
    }

    isSketchType() {
        return this.isType('sketch');
    }

    getContainer () {
        return this.opt.container || document.body;
    }

    initialize() {
        this.$body = new Dom(this.getContainer());
        this.$root = new Dom('div', 'codemirror-colorpicker');

        //  append colorpicker to container (ex : body)
        if (this.opt.position == 'inline') {
            this.$body.append(this.$root);
        }

        if (this.opt.type) {    // to change css style
            this.$root.addClass(this.opt.type);
        }

        this.$arrow = new Dom('div', 'arrow');


        this.$root.append(this.$arrow);
        this.$root.append(this.palette.$el);
        this.$root.append(this.control.$el);
        this.$root.append(this.information.$el);
        this.$root.append(this.currentColorSets.$el);
        this.$root.append(this.colorSetsChooser.$el);
        this.$root.append(this.contextMenu.$el);

        this.$checkColorPickerClass = this.checkColorPickerClass.bind(this);

        this.initColor(this.opt.color);

        // register all events 
        this.initializeEvent();        
    }

    showContextMenu(e, index) {
        this.contextMenu.show(e, index);
    }

    setColor(value, isDirect = false) {

        if (typeof (value) == "object") {
            if (!value.r || !value.g || !value.b)
                return;

            if (isDirect) {
                this.callbackColorValue(Color.format(value, "hex"));
            } else {
                this.initColor(Color.format(value, "hex"));
            }

        } else if (typeof (value) == "string") {

            if (isDirect) {
                this.callbackColorValue(value);
            } else {
                this.initColor(value);
            }



        }
    }

    getColor(type) {
        this.caculateHSV();
        var rgb = this.convertRGB();

        if (type) {
            return Color.format(rgb, type);
        }

        return rgb;
    }

    definePositionForArrow(opt, elementScreenLeft, elementScreenTop) {
        //this.$arrow.css({})
    }

    definePosition(opt) {

        var width = this.$root.width();
        var height = this.$root.height();

        // set left position for color picker
        var elementScreenLeft = opt.left - this.$body.scrollLeft();
        if (width + elementScreenLeft > window.innerWidth) {
            elementScreenLeft -= (width + elementScreenLeft) - window.innerWidth;
        }
        if (elementScreenLeft < 0) { elementScreenLeft = 0; }

        // set top position for color picker
        var elementScreenTop = opt.top - this.$body.scrollTop();
        if (height + elementScreenTop > window.innerHeight) {
            elementScreenTop -= (height + elementScreenTop) - window.innerHeight;
        }
        if (elementScreenTop < 0) { elementScreenTop = 0; }

        // set position
        this.$root.css({
            left: (elementScreenLeft) + 'px',
            top: (elementScreenTop) + 'px'
        });
    }

    getInitalizePosition() {
        if (this.opt.position == 'inline') {
            return {
                position: 'relative',
                left: 'auto',
                top: 'auto',
                display: 'inline-block'
            }
        } else {
           return {
                position: 'fixed',  // color picker has fixed position
                left: '-10000px',
                top: '-10000px'
            }
        }
    }

    show(opt, color, callback) {
        this.destroy();
        this.initializeEvent();
        this.$root.appendTo(this.$body);

        this.$root.css(this.getInitalizePosition()).show();

        this.definePosition(opt);

        this.isColorPickerShow = true;

        this.isShortCut = opt.isShortCut || false;

        this.initColor(color);

        // define colorpicker callback
        this.colorpickerCallback = callback;

        // define hide delay
        this.hideDelay = opt.hideDelay || 2000;
        if (this.hideDelay > 0) {
            this.setHideDelay(this.hideDelay);
        }

    }

    setHideDelay(delayTime) {
        delayTime = delayTime || 0;

        this.$root.off('mouseenter');
        this.$root.off('mouseleave');

        this.$root.on('mouseenter', () => {
            clearTimeout(this.timerCloseColorPicker);
        });

        this.$root.on('mouseleave', () => {
            clearTimeout(this.timerCloseColorPicker);
            this.timerCloseColorPicker = setTimeout(this.hide.bind(this), delayTime);
        });

        clearTimeout(this.timerCloseColorPicker);
        this.timerCloseColorPicker = setTimeout(this.hide.bind(this), delayTime);
    }

    hide() {
        if (this.isColorPickerShow) {
            this.destroy();
            this.$root.hide();
            this.$root.remove();  // not empty 
            this.isColorPickerShow = false;
        }
    }

    convertRGB() {
        return Color.HSVtoRGB(this.currentH, this.currentS, this.currentV);
    }

    convertHEX() {
        return Color.format(this.convertRGB(), 'hex');
    }

    convertHSL() {
        return Color.HSVtoHSL(this.currentH, this.currentS, this.currentV);
    }

    getCurrentColor() {
        return this.information.getFormattedColor();
    }

    getFormattedColor(format) {
        format = format || 'hex';

        if (format == 'rgb') {
            var rgb = this.convertRGB();
            rgb.a = this.currentA;
            return Color.format(rgb, 'rgb');
        } else if (format == 'hsl') {
            var hsl = this.convertHSL();
            hsl.a = this.currentA;
            return Color.format(hsl, 'hsl');
        } else {
            var rgb = this.convertRGB();
            return Color.format(rgb, 'hex');
        }
    }



    setInputColor(isNoInputColor) {
        this.information.setInputColor(isNoInputColor);
        this.control.setInputColor(isNoInputColor);

        this.callbackColorValue();
    }

    changeInputColorAfterNextFormat() {
        this.control.setInputColor();

        this.callbackColorValue();
    }

    callbackColorValue(color) {

        color = color || this.getCurrentColor();


        if (!isNaN(this.currentA)) {
            if (typeof this.opt.onChange == 'function') {
                this.opt.onChange.call(this, color);
            }
    
            if (typeof this.colorpickerCallback == 'function') {
                this.colorpickerCallback(color);
            }        

        }
    }

    caculateHSV() {

        var obj = this.palette.caculateSV();
        var control = this.control.caculateH();

        var s = obj.s;
        var v = obj.v;
        var h = control.h;


        if (obj.width == 0) {
            h = 0;
            s = 0;
            v = 0;
        }

        this.currentH = h
        this.currentS = s
        this.currentV = v 
    }


    setColorUI() {
        this.control.setColorUI()
        this.palette.setColorUI()
    }

    setCurrentHSV(h, s, v, a) {
        this.currentA = a;
        this.currentH = h;
        this.currentS = s ;
        this.currentV = v;
    }


    setCurrentH(h) {
        this.currentH = h;
    }

    setCurrentA(a) {
        this.currentA = a;
    }

    setBackgroundColor(color) {
        this.palette.setBackgroundColor(color);
    }

    setCurrentFormat(format) {
        this.format = format;
        this.information.setCurrentFormat(format);
    }

    getHSV(colorObj) {
        if (colorObj.type == 'hsl') {
            return Color.HSLtoHSV(colorObj);
        } else {
            return Color.RGBtoHSV(colorObj);
        }

    }

    initColor(newColor, format) {
        let c = newColor || "#FF0000", colorObj = Color.parse(c);
        format = format || colorObj.type;


        this.setCurrentFormat(format);

        let hsv = this.getHSV(colorObj);
        this.setCurrentHSV(hsv.h, hsv.s, hsv.v, colorObj.a);
        this.setColorUI();
        this.setHueColor();
        this.setInputColor();
    }

    changeInformationColor(newColor) {
        let c = newColor || "#FF0000", colorObj = Color.parse(c);

        let hsv = this.getHSV(colorObj);
        this.setCurrentHSV(hsv.h, hsv.s, hsv.v, colorObj.a);
        this.setColorUI();
        this.setHueColor();
        this.control.setInputColor();
        this.callbackColorValue();
    }

    setHueColor() {
        this.control.setOnlyHueColor();
    }

    checkColorPickerClass(el) {
        var hasColorView = new Dom(el).closest('codemirror-colorview');
        var hasColorPicker = new Dom(el).closest('codemirror-colorpicker');
        var hasCodeMirror = new Dom(el).closest('CodeMirror');
        var IsInHtml = el.nodeName == 'HTML';

        return !!(hasColorPicker || hasColorView || hasCodeMirror);
    }

    checkInHtml(el) {
        var IsInHtml = el.nodeName == 'HTML';

        return IsInHtml;
    }

    // Event Bindings 
    'mouseup document' (e) {
        this.palette.EventDocumentMouseUp(e);
        this.control.EventDocumentMouseUp(e);

        // when color picker clicked in outside
        if (this.checkInHtml(e.target)) {
            //this.setHideDelay(hideDelay);
        } else if (this.checkColorPickerClass(e.target) == false) {
            this.hide();
        }
    }

    'mousemove document' (e) {
        this.palette.EventDocumentMouseMove(e);
        this.control.EventDocumentMouseMove(e);
    }

    initializeEvent() {

        this.initializeEventMachin();

        this.palette.initializeEvent();
        this.control.initializeEvent();
        this.information.initializeEvent()
        this.currentColorSets.initializeEvent()
        this.colorSetsChooser.initializeEvent();
        this.contextMenu.initializeEvent();

    }

    currentFormat() {
        this.information.currentFormat();
    }

    toggleColorChooser() {
        this.colorSetsChooser.toggle();
    }

    refreshColorSetsChooser() {
        this.colorSetsChooser.refresh();
    }

    getColorSetsList() {
        return this.colorSetsList.getColorSetsList();
    }

    setCurrentColorSets(nameOrIndex) {
        this.colorSetsList.setCurrentColorSets(nameOrIndex);
        this.currentColorSets.refresh();
    }

    setColorSets(list) {
        this.colorSetsList.setUserList(list);
    }

    destroy() {
        super.destroy();

        this.control.destroy();
        this.palette.destroy();
        this.information.destroy();
        this.colorSetsChooser.destroy();
        this.colorSetsList.destroy();
        this.currentColorSets.destroy();
        this.contextMenu.destroy();

        // remove color picker callback
        this.colorpickerCallback = undefined;
    }
}