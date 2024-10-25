$(document).ready(function() {
    function newsentence(author, sentence) {
        //定义新生成的物块的样式，一个div包含一个p，button，点赞数
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

        let setcontent = $('<p></p>').css('margin', '5px').text(`${sentence} -- ${author}`);


        let setbutton = $('<button></button>').css('margin', '5px').text('点赞');


        let setnumber = $('<span></span>').css('margin', '5px').text('点赞数: 0');

        block.append(setcontent, setbutton, setnumber);

        $('.content').append(block);
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
                    throw new Error('Network response failed' + response.statusText);
                }
                return response.json();
            })

            .then(data => {
                let author = data.data.author;
                let sentence = data.data.hitokoto;
                newsentence(author, sentence);

            })
            .catch(error => console.error('Error:', error));
    }

    $("#button1").click(function () {
        put();
    })


    // divs.each(function () {
    //     $(this).data('clicknumber', 0)//为每一个div设置一个属性与值，如果将$(this)改为divs，只会对第一个div赋予
    // })

    //错误的写法
    // $('.content div button').click(function () {}
    //由于button是新生成的，无法使用click事件，而应该用onclick事件监听
    // $('.content').on('click', 'button', function() {...})
    // 事件委托。将事件监听器绑定到了 .content 元素上，button 元素是在事件绑定之后动态添加到 DOM 中情况，事件处理器仍然会有效。

    $('.content').on('click', 'button', function () {
        alert('已为该语句点赞');
        var parentdiv = $(this).parent('div');//找到父元素div
        var count = parentdiv.data('clicknumber');
        count++;//点赞属性值增加
        parentdiv.data('clicknumber', count);//更新数据
        parentdiv.find('span').text('点赞数: ' + count);//打印点赞数
    })


    $(".button2").click(function () {
        //     let divsArray = $('.content div').map(function () { return this; }).get();
        //     divsArray.sort(function (a, b) {
        //         return  $(a).data('clicknumber') - $(b).data('clicknumber') ;
        //     });
        //     divsArray.forEach(function(div) {
        //         $('.content').append(div);
        //     });
        // });
        
        //jquery是数组式的对象，可以直接用sort方法，但原生js中的对象无法使用sort
        // jQuery 对象没有 toArray() 方法。如果想要将 jQuery 对象转换为数组，应该使用如下
        //let divsArray = $('.content div').map(function () { return this; }).get();
        // .append() 应该用 jQuery 对象或 HTML 字符串，所以()内不能直接用divs，divs是类数组对象
        
        alert('已按正序排序');
        let divs = $('.content div').sort(function (a, b) {
            return $(a).data('clicknumber') - $(b).data('clicknumber');
        });//sort排序
        $('.content').append($(divs)); //divs加$重新变为jQuery对象，能用append
        
    });


    $(".button3").click(function () {
        alert('已按倒序排序');
        let divs = $('.content div').sort(function (a, b) {
            return $(b).data('clicknumber') - $(a).data('clicknumber');
        });
        $('.content').append($(divs)); 
    });
})
