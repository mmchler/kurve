/**
 *
 * Program:     Kurve
 * Author:      Markus Mächler, marmaechler@gmail.com
 * License:     http://www.gnu.org/licenses/gpl.txt
 * Link:        http://achtungkurve.com
 *
 * Copyright © 2014 Markus Mächler
 *
 * Kurve is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Kurve is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Kurve.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

'use strict';

Kurve.Player = function(id, color, keyLeft, keyRight, keySuperpower) {

    var points              = 0;
    var superpower          = Kurve.Factory.getSuperpower(Kurve.Superpowerconfig.types.RUN_FASTER);
    var superPowerElement   = null;

    this.isActive   = false;
    
    this.incrementPoints = function() {
        points++;
    };

    this.setSuperpower      = function(newSuperpower) {
        superpower = newSuperpower;

        if (superPowerElement === null) {
            superPowerElement = document.getElementById(this.getId() + '-superpower');
        }

        superPowerElement.innerHTML = this.getSuperpower().getLabel();
    };

    this.setColor           = function(newColor) { color = newColor; };
    
    this.getPoints          = function() { return points; };
    this.getId              = function() { return id; };
    this.getColor           = function() { return color; };
    this.getSuperpower      = function() { return superpower; };
    this.getKeyLeft         = function() { return keyLeft; };
    this.getKeyRight        = function() { return keyRight; };
    this.getKeySuperpower   = function() { return keySuperpower; };

};

Kurve.Player.prototype.renderMenuItem = function() {
    return  '<div id="' + this.getId() + '" class="player inactive ' + this.getId() +'">' +
                '<div class="title light"><h2>' + this.getId() + '</h2></div>' +
                '<div class="key left light"><div>' + this.getKeyLeftChar() + '</div></div>' +
                '<div class="key right light"><div>' + this.getKeyRightChar() + '</div></div>' +
                '<div class="superpower">' +
                    '<div class="key light">' + this.getKeySuperpowerChar() + '</div>' +
                    '<div class="superpowerType light">' +
                        '<div class="left" onclick="Kurve.Menu.onPreviousSuperPowerClicked(event, \'' + this.getId() + '\')"></div>' +
                        '<div class="superpowers">' +
                            '<div id="' + this.getId() + '-superpower">' + this.getSuperpower().getLabel() + '</div>' +
                        '</div> ' +
                        '<div class="right" onclick="Kurve.Menu.onNextSuperPowerClicked(event, \'' + this.getId() + '\')"></div>' +
                    '</div> ' +
                '</div>' +
                '<div class="clear"></div>' +
            '</div>';
};

Kurve.Player.prototype.renderScoreItem = function() {
    return  '<div class="active ' + this.getId() + '">' +
                '<div class="title"><h2>' + this.getId() + '</h2></div>' +
                '<div class="points">' + this.getPoints() + '</div>' +
                '<div class="clear"></div>' +
                '<div class="superpowers">' + this.renderNumberOfSuperPowers() + '</div>' +
                '<div class="clear"></div>' +
            '</div>';
};

Kurve.Player.prototype.renderNumberOfSuperPowers = function() {
    var superpowers = '';

    for (var i=0; i < this.getSuperpower().count; i++ ) {
        superpowers += '<div class="superpowerCircle ' + this.getId() + '"></div>';
    }

    return superpowers;
}

Kurve.Player.prototype.isKeyRight = function(keyCode) {
    return this.getKeyRight() === keyCode;
};
    
Kurve.Player.prototype.isKeyLeft = function(keyCode) {
    return this.getKeyLeft() === keyCode;
};

Kurve.Player.prototype.isKeySuperpower = function(keyCode) {
    return this.getKeySuperpower() === keyCode;
};

Kurve.Player.prototype.getKeyLeftChar = function() {
    return String.fromCharCode(this.getKeyLeft());
};

Kurve.Player.prototype.getKeyRightChar = function() {
    return String.fromCharCode(this.getKeyRight());
};

Kurve.Player.prototype.getKeySuperpowerChar = function() {
    return String.fromCharCode(this.getKeySuperpower());
};