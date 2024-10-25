$(document).ready(function() {
    function newsentence(author, sentence) {
        let block = $('<div></div>').css({
            'width': '700px',
            'display': 'flex',
            'flex-direction': 'column',
            'background-color': 'white',
            'border': '1px solid black',
            'margin-bottom': '10px',
            'align-items': 'center',
            'border-radius': '5px',
        }).data('clicknumber', 0); // 初始化点击次数,在之后初始可能导致失败

        let setcontent = $('<p></p>').css('margin', '5px').text(`${sentence} -- ${author}`)


        let setbutton = $('<button></button>').css('margin', '5px').text('点赞')


        let setnumber = $('<span></span>').css('margin', '5px').text('点赞数: 0');

        block.append(setcontent, setbutton, setnumber)

        $('.content').append(block)
    }


    function put() {
        fetch('https://tenapi.cn/v2/yiyan', {
            method: 'POST',
            body: new URLSearchParams({
                'format': 'json'
            })
        })

            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })

            .then(data => {
                let author = data.data.author;
                let sentence = data.data.hitokoto;
                newsentence(author, sentence);

            })
            .catch(error => console.error('Error:', error))
    }

    $("#button1").click(function () {
        put()
    })


    // divs.each(function () {
    //     $(this).data('clicknumber', 0)//为每一个div设置一个属性与值，如果将$(this)改为divs，只会对第一个div赋予
    // })

    //错误的写法
    // $('.content div button').click(function () {
    //     alert('已为该语句点赞')
    //     var parentdiv = $(this).parent('div')
    //     var count = parentdiv.data('clicknumber')||0;
    //     count++
    //     parentdiv.data('clicknumber', count);
    // })

    //由于button是新生成的，无法使用click事件，而应该用onclick事件监听
    // $('.content').on('click', 'button', function() {...})
    // 事件委托。它实际上是将事件监听器绑定到了 .content 元素上，但只有当事件的目标（在这个例子中是 button）匹配给定的选择器（'button'）时，事件处理器才会被触发。这种方式的好处是，即使 .content 内的 button 元素是在事件绑定之后动态添加到 DOM 中的，事件处理器仍然会有效。
    //
    // $('.content button').on('click', function() {...})
    // 这种方式直接将事件监听器绑定到了所有当前匹配 .content button 选择器的元素上。如果 .content 内的 button 元素是在事件绑定之后动态添加到 DOM 中的，那么这些新添加的 button 元素将不会有这个事件监听器，因此点击它们时不会触发事件处理器。

    $('.content').on('click', 'button', function () {
        alert('已为该语句点赞');
        var parentdiv = $(this).parent('div');
        var count = parentdiv.data('clicknumber');
        count++;
        parentdiv.data('clicknumber', count);
        parentdiv.find('span').text('点赞数: ' + count);
    })


    $(".button2").click(function () {
        //     {
        //         alert('已按正序排序')
        //         let divs = $('.content div')
        //         let divsarray = divs.toArray()
        //         divsarray.sort(function (a, b) {
        //             return $(a).data('clicknumber') - $(b).data('clicknumber');
        //         })
        //         let $sortdivs = $(divsarray);
        //         $('.content').empty().append($sortdivs);
        //     }
        // }) $(".button2").click(function () {

        //jquery是数组式的对象，可以直接用sort方法，但原生js中的对象无法使用sort
        // jQuery 对象没有 toArray() 方法。如果您想要将 jQuery 对象转换为数组，应该使用如下
        //let divsArray = $('.content div').map(function () { return this; }).get();

        alert('已按正序排序');
        let divs = $('.content div').sort(function (a, b) {
            return $(a).data('clicknumber') - $(b).data('clicknumber');
        });
        $('.content').append($(divs)); //
    });


    $(".button3").click(function () {
        alert('已按倒序排序');
        let divs = $('.content div').sort(function (a, b) {
            return $(b).data('clicknumber') - $(a).data('clicknumber');
        });
        $('.content').append($(divs)); // .append() 应该用 jQuery 对象或 HTML 字符串，所以()内不能直接用divs
    });
})