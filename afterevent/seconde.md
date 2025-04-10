        afterEvent(chart, args, options) {
            const { ctx, chartArea: {top, right}} = chart;
            // console.log(args );
            // const { native } = args.event;
            // const {offsetX, offsetY} = native;
            const x = args.event.x;
            const y = args.event.y;

            if (x > right - 50 && x < right - 40 && y > top - 25 && y < top - 5) {
                colorLeft = 'red';
                args.event.native.target.style.cursor = 'pointer';
                if (args.event.type === 'click' && page > page[0]) {
                    page --;  
                }

            } else {
                colorLeft = 'black';
                args.event.native.target.style.cursor = 'default';
            }
            
            if (x > right - 10 && x < right && y > top - 25 && y < top - 5) {
                colorRight = 'red';
                args.event.native.target.style.cursor = 'pointer';
                if (args.event.type === 'click' && page < page[-1]) {
                    page ++;  
                }
            } else {
                colorRight = 'black';
                args.event.native.target.style.cursor = 'default';
            }
            chart.update();
        }