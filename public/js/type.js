+(function () {
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
            cursorColor             : options.cursor ? options.cursor.cursorColor   || '#2c3e50': '#2c3e50',
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

let bar = document.querySelector('#bar'),
    foo = document.querySelector('#foo'),
    delta = document.querySelector('#delta');




foo.typed() //CALL THE FUNCTION WITH THE DEFAULT OPTIONS

delta.typed({ //CALL THE FUNCTION DIRECTLY WITH OPTIONS
    cursor: {
        addCursor: true,
        removeCursor: true
    }
}) 


const options = { 
    timing: {
        speed           : 100,          //DEFAULT IS 160ms
        delay           : 5000,         //DEFAULT IS FALSE
        startPosition   : 2,            //DEFAULT IS 0
        pausePosition   : 23,           //DEFAULT IS NULL
        pauseDuration   : 3000          //DEFAULT IS NULL
    },
    cursor: {
        addCursor       : true,         //DEFAULT IS FALSE
        cursorType      : '_',          //DEFAULT IS '|'
        blinkSpeed      : 200,          //DEFAULT IS 500ms
        cursorColor     : '#c0392b',    //DEFAULT IS '#2c3e50'
        cursorShadow    : true,         //DEFAULT IS FALSE
        removeCursor    : false         //DEFAULT IS FALSE
    },
    callback: ()=> alert('This is a callback function!') //CALLBACK FUNCTION, DEFAULT IS NULL
}

bar.typed(options) //CALL THE FUNCTION UNSING A VARIABLE AS OPTIONS
