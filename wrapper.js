
    var arr = [function() {
        alert('before function call');
    }, function() {
        alert('after function call');
    }];


    function AttachMe(object, method, wrapper, arr) {
        var fn = object[method];

        return object[method] = function() {

            return wrapper.apply(this, [fn.bind(this)].concat(
                Array.prototype.slice.call(arguments), arr));
        };
    };

    AttachMe(window, "test", function(orginalFn) {

        var originalParams = Array.prototype.slice.call(arguments, 1);
        console.log(originalParams);
        var before = originalParams[0];
        var after = originalParams[1];
        before();
        orginalFn.apply(undefined, originalParams);
        after();
    }, arr);
