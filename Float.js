/**
 * @author radcheb / radcheb@gmail.com
 */

var FLOAT = function(){ 
	this.VERSION= '0.0.1';
	var _MANTISSA_LENGTH = 4;
	var _EXPO_LENGTH = 3;

	var _ensure_binary_array = function(input){
		var i;
		if(! input instanceof Array){
			return false;
		}

		for (i = 0; i < input.length; i++) {
			if(typeof input[i] != "number" && typeof input[i] != "boolean"){
				return false;
			}
		}


	}

	var _signbit = function(input){
		if(! _ensure_binary_array(input)){
			console.log("Input not array of binary: ",input);
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
			console.log("Input not array of binary: ",input);
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
			console.log("Input not array of binary: ",input);
			return false;
		}

    	var result = 0;
        var expo = _expo(input);
        int i = 4, j = -1 + expo;

        // The charAt(i) increases, while the pow(2,j) decreases
        while(i != 8){
            if(input[i] == 1){
                result += Math.pow(2,j);
            }//endif
            i++; j--;
        }//endwhile

        // If true, then negative number
        if(signbit(input)){
            result *= -1;
        }//endif
 
        return result;
	}

	this.mantissa = _mantissa;
	return {
		mantissa:this.mantissa
	}
};

FLOAT.prototype.float8 = function(byte){
	return 0;
}