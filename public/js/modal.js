/*
 * Модальное окно
 */
$(function(){
/*Необходимые переменные*/
    var widthWindow = $(window).width();
    var heightWindow = $(window).height();
    $(window).resize(function(){
        widthWindow = $(window).width();
        heightWindow = $(window).height();
    });
    var body = $('BODY');
    var htmlCodeModal = {
        modalHtml:
                '<div class="l-modal"> \
                    <div class="b-modal-window"> \
                        <div class="b-loader"><img src="/img/elements/ajax-loader.gif" /></div> \
                        <h1 class="logo-modal">Эксклюзив</h1> \
                        <div class="close-modal"> \
                            <a href="?" class="link">Закрыть окно<b class="b-icon b-icon-close"></b></a> \
                        </div> \
                        <div class="content"> \
                        </div> \
                        <div class="b-map"> \
                        </div> \
                    </div> \
                </div>',
        mapHTML:
                '<h1 class="b-title-map">Схема проезда</h1> \
                <div class="b-address">ул. Карпинского, 18 <br /> Тверь</div>',
        galleryHTML:
                '<div class="b-gallery"> \
                    <div class="prev-image"><a href="?prev_image" class="link">Предыдущая фотография</a></div> \
                    <div class="active-image"></div> \
                    <div class="next-image"><a href="?next_image" class="link">Следующая фотография</a></div> \
                </div>'
    };
    var modal = {
        callModal: '.modal',
        closeModal: '.close-modal',
        modalInDOM: '.l-modal',
        modalContent: '.l-modal .content'
    };
/*Global*/
    var index_active_element, count_element, all_images;
    animationGallery();


    body.append(htmlCodeModal.modalHtml);

    mainModal();

/*Вызов модального окна*/
    function mainModal(){
        /*Открытие модального окна*/
        $(modal.callModal).click(function(){

            $(modal.modalInDOM).show();
            body.addClass('l-modal-active');
            /*Добавление содержимого модального окна, взависимости от значения rel*/
            var rel = $(this).attr('rel');
            if(rel.indexOf('gallery') != -1) modalGallery(rel,$(this)[0]);
            else if(rel.indexOf('map') != -1) modalMap()

            return false;
        });
        /*Закрытие модального окна*/
        $(modal.closeModal).click(function(){hideModal(); return false;});

        $('.l-modal, .l-modal .active-image').live('click', function(event){
            var element = event.target.nodeName;
            if(element == 'IMG')return false;
            else hideModal();
        });
    }

    function hideModal(){
        body.removeClass('l-modal-active').append('<div id="YMapsID" style="width:600px;height:400px;display:none"></div>');
        $(modal.modalInDOM).hide();
        $(modal.modalContent).empty();
        $('.b-map').empty();
    }



    /*Добавление карты в модальное окно*/
    function modalMap(){
        var map = $('#YMapsID');
        $('.b-map').show().html(map).width($(window).width()-2*200);
        $('.b-map #YMapsID').height(heightWindow-275).width($(window).width()-2*200);
        $('.b-map #YMapsID').before('<h1 class="b-title-map">Схема проезда</h1>');
        $('.b-map #YMapsID').after('<div class="b-address">ул. Карпинского, 18 <br /> Тверь</div>')
    }



    /*Добавление галереи в модальное окно*/
    function modalGallery(rel, active_element){
        $('.b-map').hide();
        $(modal.modalContent).append(htmlCodeModal.galleryHTML);
        addImage(rel, active_element);
    }


    function addImage(rel, active_element){
        var all_links_with_images = $('.modal[rel *= '+ rel +']'),
            area_for_images = $('.b-gallery .active-image');
        index_active_element = $.inArray(active_element, all_links_with_images);
        count_element = all_links_with_images.size();

        /*Добавление изображений*/
        for(var i = 0; i < count_element; i++){
            var src = all_links_with_images.eq(i).attr('href');
            if(i == index_active_element) area_for_images.append('<img class="image" src="'+src+'" alt=""/>');
            else area_for_images.append('<img class="image image-hidden" src="'+src+'" alt=""/>');
        }
        all_images = area_for_images.find('.image');
        all_images.each(function(){$(this).hide();});
        loaderImages(all_images);
        activetionArrow(index_active_element);
    }



    function animationGallery(){
        $('.b-gallery .next-image .link, .b-gallery .active-image').live('click', function(){
            if(index_active_element != count_element-1){
                all_images.eq(index_active_element).fadeOut(50,function(){
                    $(this).addClass('image-hidden');
                    all_images.eq(index_active_element+1).fadeIn(50, function(){
                        $(this).removeClass('image-hidden');
                        index_active_element = index_active_element+1;
                    });
                });
                activetionArrow(index_active_element+1);
            }

            return false;
        });
        $('.b-gallery .prev-image .link').live('click', function(){
            if(index_active_element != 0){
                all_images.eq(index_active_element).fadeOut(50,function(){
                    $(this).addClass('image-hidden');
                    all_images.eq(index_active_element-1).fadeIn(50,function(){
                        $(this).removeClass('image-hidden');
                        index_active_element = index_active_element-1;
                    });
                });
                activetionArrow(index_active_element-1);
            }

            return false;
        });
    }


    function loaderImages(images){
        images.each(function(index,element){
            $(element).load(function(){
                sizeImage($(element), index);
            });

        });

    }

    function activetionArrow(active_element){
        var link_prev_image = $('.b-gallery .prev-image'),
            link_next_image = $('.b-gallery .next-image');

        if(active_element == 0) link_prev_image.addClass('prev-image-not');
        else link_prev_image.removeClass('prev-image-not');

        if(active_element == count_element-1) link_next_image.addClass('next-image-not');
        else link_next_image.removeClass('next-image-not');
    }

    function sizeImage(image, index){
        var widthContainer = widthWindow - 400,
            heightContainer = heightWindow - 90 - 80;

        var image_width = image.width(), img_width = image.width(),
            image_height = image.height(), img_height = image.height();

            if(image_width > widthContainer && image_height > heightContainer) {
                image.height(heightContainer);
                image_height = image.height();
                image_width = image.width();
            }
            if(image_width <= widthContainer && image_height > heightContainer) image.height(heightContainer);
            if(image_width > widthContainer && image_height <= heightContainer) {
                image.width(widthContainer).height(image_height*widthContainer/image_width);
            }
        senteringImage(image, index);
    }

    function senteringImage(image, index){
        var heightContainer = heightWindow - 90 - 80,
            heightImage = image.height();
        image.css('padding-top',(heightContainer-heightImage)/2);
        $('.b-loader').hide();
        if(index == index_active_element) all_images.eq(index_active_element).show();
    }

});






