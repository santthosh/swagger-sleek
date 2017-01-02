'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _colors = require('material-ui-ref/styles/colors');

var _colorManipulator = require('material-ui-ref/utils/colorManipulator');

var _spacing = require('material-ui-ref/styles/spacing');

var _spacing2 = _interopRequireDefault(_spacing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    spacing: _spacing2.default,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: _colors.indigo500,
        primary2Color: _colors.indigo700,
        primary3Color: _colors.indigo800,
        accent1Color: _colors.greenA200,
        accent2Color: _colors.greenA400,
        accent3Color: _colors.greenA100,
        textColor: _colors.darkBlack,
        secondaryTextColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.54),
        alternateTextColor: _colors.white,
        canvasColor: _colors.white,
        borderColor: _colors.grey300,
        disabledColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.3),
        pickerHeaderColor: _colors.cyan500,
        clockCircleColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.07),
        shadowColor: _colors.fullBlack
    }
};