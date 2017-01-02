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
        textColor: _colors.fullWhite,
        secondaryTextColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.7),
        alternateTextColor: '#303030',
        canvasColor: '#303030',
        borderColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.3),
        disabledColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.3),
        pickerHeaderColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.12),
        clockCircleColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.12)
    }
};