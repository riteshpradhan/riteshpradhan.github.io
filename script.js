
window.addEventListener('DOMContentLoaded', setup); 

function setup() {
    //No Outline Unless Tabbing
    document.body.addEventListener('keyup', function(e) {
        if (e.key === 'Tab') {
          document.documentElement.classList.remove('no-focus-outline');
        }
    });

    //Mobile Navigation 
    const nav = document.getElementById('nav');

    function expandNav() {
        burger.classList.toggle('change');
        nav.classList.toggle('show');
    }

    const lis = document.querySelectorAll('#nav li'); 

    let num = lis.length; 
    let delay = 0.3;  
    while(num > 0) {
        lis[lis.length - num].style.animationDelay = delay + 's'; 
        num--; 
        delay += 0.3; 
    } 

    const burger = document.getElementById('burger'); 
    burger.addEventListener('click', expandNav);

    //if window gets resized and nav is open - close it. 
    if(window.innerWidth < 800) {
        window.addEventListener('resize', function() {
            burger.classList.remove('change');
            nav.classList.remove('show');
        });
    }
    

    //when there is a click on one of the links, close the navigation (on mobile)
    lis.forEach(li => li.addEventListener('click', function() {
        burger.classList.remove('change');
        nav.classList.remove('show');
    }));

    //Intersection Observers
    const h2s = document.querySelectorAll('h2');
    const testimonials = document.querySelectorAll('.testimonial-comment');

    if('IntersectionObserver' in window) {
        //change colour of header based on its position
        const banner = document.querySelector('.banner-video'); 	
        const options = {
            root: null, 
            threshold: 0,
            rootMargin: "-250px"
        }

        const observer = new IntersectionObserver( (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    nav.classList.remove('blue'); 
                } 

                if(!entry.isIntersecting) {
                    nav.classList.add('blue');
                }
                
            })
        }, 
        options); 

        observer.observe(banner);


        // Intersection Observer: site affects 
        const appearOptions = {
            threshold: 0, 
            rootMargin: '0px 0px -30px 0px'
        }; 

        const appearOnScroll = new IntersectionObserver(
            function(entries, appearOnScroll) {
                entries.forEach(entry => {
                    if(!entry.isIntersecting) { return; }
                    else { 
                        entry.target.classList.add('appear'); 
                        appearOnScroll.unobserve(entry.target);
                    }
                })
            }, appearOptions
        );

        // effect for <h2>s
        function addDelay(spans) {
            let del = 0; 
            let n = spans.length; 

            while(n > 0) {
                spans[spans.length - n].style.transitionDelay = del + 's';
                del += 0.1; 
                n--;
            } 
        }

        //loop through each h2 and add delay to its spans
         
        h2s.forEach((h2, i) => {
            let params = 'section:nth-of-type(' + (i + 1) + ') h2 > span';
            let spans = document.querySelectorAll(params);
            addDelay(spans);
        });

        h2s.forEach(h2 => appearOnScroll.observe(h2));

        //change opacity of testimonials
        testimonials.forEach(testimonial => appearOnScroll.observe(testimonial));

    } else {
        //make all elements appear without any effects
        nav.classList.add('blue');
        h2s.forEach(h2 => h2.classList.add('appear'));
        testimonials.forEach(testimonial => testimonial.classList.add('appear'));
    }
}
