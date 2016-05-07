/**
 * @author radcheb / radcheb@gmail.com
 */
"use strict";

var FLOAT = function(){
	return {VERSION : '0.0.1'};
}

FLOAT.prototype.mantissa = function(bits_array){ 

	var _MANTISSA_LENGTH = 4;
	var _EXPO_LENGTH = 3;

	var _ensure_binary_array = function(input){

		var i;
		if(! input instanceof Array){
			console.log("input is " + typeof input)
			return false;
		}

		for (i = 0; i < input.length; i++) {
			if(typeof input[i] != "number" && typeof input[i] != "boolean"){
				console.log("input is " + typeof input[i]);
				return false;
			}
		}
		return true;
	}

	var _signbit = function(input){
		if(! _ensure_binary_array(input)){
			console.log("_signbit: Input not array of binary: ",input);
			return false;
		}
        var result = 0;

        if(input[0] == 1){
            result = 1;
        }//endif
        return result;
	}

	var _expo = function(input){
		if(! _ensure_binary_array(input)){
			console.log("_expo:s Input not array of binary: ",input);
			return false;
		}
        var result = 0;
        var i = _EXPO_LENGTH, j = 0;

        while(i != 0 ){
            if(input[i] == 1){
                result += Math.pow(2,j);
            }
            j++;
            i--;
        }
        return result - _MANTISSA_LENGTH;

	}

	var _mantissa = function(input){
		if(! _ensure_binary_array(input)){
			console.log("_mantissa: nput not array of binary: ",input);
			return false;
		}

    	var result = 0;
        var expo = _expo(
        	input);
        var i = 4, j = -1 + expo;

        // The charAt(i) increases, while the pow(2,j) decreases
        while(i != 8){
            if(input[i] == 1){
                result += Math.pow(2,j);
            }//endif
            i++; j--;
        }//endwhile

        // If true, then negative number
        if(_signbit(input)){
            result *= -1;
        }//endif
 
        return result;
	}

	return _mantissa(bits_array);
};

FLOAT.float8 = function(byte){

	var bits;
	var decimal;

	var _get_bits_array = function(value, length){

		var length = ( length === undefined)? 8 : length;

		var rest = value, devider;
		var bits=[], i=0;
		for(i = 0; i<length; i++){
			devider = Math.pow(2, length - i -1);
			bits[i] = Math.floor(rest / devider);
			rest = rest % devider;
		}
		return bits;
	}

	bits = _get_bits_array(byte);
	decimal = FLOAT.prototype.mantissa(bits);
	return {
		bits: bits,
		decimal: decimal
	};
}

module.exports = FLOAT;