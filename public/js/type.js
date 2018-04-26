(function () {
    "use strict";

    Element.prototype.typed = function (options) {
        options = options || {} //OVERRIDE THE DEFAULT OPTIONS

        let defaultOptions,txt,head,idx,addCursor,removeCursor,startTyping,x;

        defaultOptions = {
            speed                   : options.timing ? options.timing.speed         || 160      : 160,
            delay                   : options.timing ? options.timing.delay         || false    : false,
            startPosition           : options.timing ? options.timing.startPosition || 0        : 0,
            pausePosition           : options.timing ? options.timing.pausePosition || null     : null,
            pauseDuration           : options.timing ? options.timing.pauseDuration || null     : null,
            cursor                  : options.cursor ? options.cursor.addCursor     || false    : false,
            cursorType              : options.cursor ? options.cursor.cursorType    || '|'      : '|',
            blinkSpeed              : options.cursor ? options.cursor.blinkSpeed    || '500'    : '500',
            cursorColor             : options.cursor ? options.cursor.cursorColor   || '#fff': '#fff',
            cursorShadow            : options.cursor ? options.cursor.cursorShadow  || false    : false,
            removeCursor            : options.cursor ? options.cursor.removeCursor  || false    : false,
            callback                : options.callback || null
        } //APPLY THE DEFAULT OPTIONS IF IT DOES'T EXIST



        txt     = this.innerText,           //STORE THE TXT
        head    = document.head,            //DOCUMENT HEAD
        idx     = defaultOptions.startPosition;  //ITERABLE INDEX

        this.textContent = txt.substr(0,idx);          //CLEAR THE ELEMENT


        addCursor = ()=> {
            head.innerHTML += 
            `
                <style id="${this.id}-cursor">
                        #${this.id}::after{
                            content: '${defaultOptions.cursorType}';
                            color: ${defaultOptions.cursorColor};
                            ${defaultOptions.cursorShadow ? 'text-shadow: 0px 0px 5px rgba(0,0,0,0.3);' : ''} 
                            animation: ${this.id}-blink ${defaultOptions.blinkSpeed}ms infinite
                        }
                        @keyframes ${this.id}-blink{ 50% { opacity: 0 } }
                </style>
            ` // ADD TYPE, COLOR AND CURSOR SHADOW (OPTIONAL)
        }

        removeCursor = ()=> {
            setTimeout(() => {
                head.querySelector(`#${this.id}-cursor`).remove() // REMOVE THE CURSOR STYLES IF EXISTS (OPTIONAL)
            }, defaultOptions.speed * 10);
        }
        


        if (defaultOptions.cursor) addCursor() //ADD CURSOR-TEXT AFTER THE ELEMENT WITH A UNIQUE ID (OPTIONAL)

        startTyping = () => {
            x = setTimeout(() => {
                if (idx < txt.length) {
                    this.textContent += `${txt[idx]}` // POPULATE THE ELEMENT CONTENT
                    idx++
                    startTyping() //LOOP

                    if (defaultOptions.pauseDuration && defaultOptions.pausePosition === idx) { 
                        clearTimeout(x) //PAUSE
                        setTimeout(startTyping, defaultOptions.pauseDuration); //RESUME
                    }

                } else {

                    if (defaultOptions.cursor && defaultOptions.removeCursor) removeCursor() //REMOVE THE CURSOR STYLES FROM THE DOCUMENT HEAD
                    if (defaultOptions.callback)  defaultOptions.callback() //CALLBACK FUNCTION AFTER LOOPING
            
                }
            }, defaultOptions.speed)
        }



        (defaultOptions.delay) ? setTimeout(startTyping, defaultOptions.delay): startTyping() //START THE FUNCTION AFTER A SPECIFIC PERIOD OF TIME (OPTIONAL)
    
    
    }
})();

////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
function write() {

    var twriter = document.getElementById('writer');
    twriter.typed({ //CALL THE FUNCTION DIRECTLY WITH OPTIONS
        cursor: {
            addCursor: true,
            cursorType: '_',  
            cursorColor: '#fff',
            removeCursor: false
        }
    }); 
    
    var twriter2 = document.getElementById('writer2');
    twriter2.typed({ //CALL THE FUNCTION DIRECTLY WITH OPTIONS
        timing: {
            delay: 3000 
        },
        cursor: {
            addCursor: true,
            cursorType: '_',  
            cursorColor: '#fff',
            removeCursor: false
        }
    }); 
}

$(document).ready(function() {
    setTimeout(write, 1500); 
});


