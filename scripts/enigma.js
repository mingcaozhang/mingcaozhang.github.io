$(document).ready(function() {
    $("#encryptSubmit").click(function() {
        var text = $("#text").val();
        submitAjax(text);
    });
});

function increment() {
    var rightRotor = document.getElementById('right');
    var right = rightRotor.textContent;
    var centerRotor = document.getElementById('center');
    var center = centerRotor.textContent;
    var leftRotor = document.getElementById('left');
    var left = leftRotor.textContent;
    if (right === 'Z') {
        rightRotor.textContent = 'A';
        if (center === 'Z') {
            centerRotor.textContent = 'A';
            if (left === 'Z') {
                leftRotor.textContent = 'A';
            } else {
                leftRotor.textContent = nextChar(left);
            }
        } else {
            centerRotor.textContent = nextChar(center);
        }
    } else {
        rightRotor.textContent = nextChar(right);
    }
}

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

function submitAjax(text) {
    var text = text;
    var right = document.getElementById('right').textContent;
    var center = document.getElementById('center').textContent;
    var left = document.getElementById('left').textContent;
    var obj = {};
    obj.text = text;
    obj.right = right;
    obj.center = center;
    obj.left = left;
    var json = JSON.stringify(obj);
    console.log(json);

    var resp = $.ajax({
        type: "POST",
        dataType: "text",
        contentType: "application/json",
        url: "https://192.168.86.68:8080/encrypt",
        data: json,
        success: function(data) {
            var output = document.querySelector('div#output');
            output.textContent = data;
        },
        failure: function(data) { console.log("Failure."); },
    });
}

function getKey(e) {
    var key = document.body.querySelector('div [data-char="' + e.key.toUpperCase() + '"]')
    console.log(key);
    return key;
}

document.addEventListener('keydown', event => {
    var key = getKey(event);
    if (key != null) {
        key.setAttribute('data-pressed', 'on');
        increment();
        submitAjax(event.key.toUpperCase());
    }
});

document.addEventListener('keyup', function(e) {
    var key = getKey(e);
    if (key != null) {
        key && key.removeAttribute('data-pressed');
    }
});