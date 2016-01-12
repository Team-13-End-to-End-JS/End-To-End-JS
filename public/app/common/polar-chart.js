(function () {
    'use strict';

    console.log(1);
    function startStatistics() {
        $.ajax({
                url: 'http://localhost:6969/statistics'
            })
            .then(function (statistics) {

                let colors = [
                    "#99cc33", "#F7464A", "#46BFBD", "#FDB45C", "#9966ff", "#888BDC", "#DEF25C"
                ];

                let highlights = [
                    "#99cc66", "#FF5A5E", "#5AD3D1", "#FFC870", "#9933cc", "#9FA1E3", "#BED435"
                ];

                let offerTypes = [];

                for (let property in statistics.offerTypes) {
                    if (statistics.offerTypes.hasOwnProperty(property)) {
                        let random = Math.floor(Math.random() * colors.length);
                        offerTypes.push({
                            value: statistics.offerTypes[property],
                            color: colors[random],
                            highlight: highlights[random],
                            label: property
                        });
                    }
                }


                let realEstateTypes = [];

                for (let property in statistics.realEstateTypes) {
                    if (statistics.realEstateTypes.hasOwnProperty(property)) {
                        let random = Math.floor(Math.random() * colors.length);
                        realEstateTypes.push({
                            value: statistics.realEstateTypes[property],
                            color: colors[random],
                            highlight: highlights[random],
                            label: property
                        });
                    }
                }

                let constructionTypes = [];

                for (let property in statistics.constructionTypes) {
                    if (statistics.constructionTypes.hasOwnProperty(property)) {
                        let random = Math.floor(Math.random() * colors.length);
                        constructionTypes.push({
                            value: statistics.constructionTypes[property],
                            color: colors[random],
                            highlight: highlights[random],
                            label: property
                        });
                    }
                }

                if (document.getElementById("chart-area-offer-types")) {

                    let ctx = document.getElementById("chart-area-offer-types").getContext("2d");
                    window.myPolarArea = new Chart(ctx).Pie(offerTypes, {
                        responsive: true
                    });

                }

                if (document.getElementById("chart-area-real-estate-types")) {

                    let ctx = document.getElementById("chart-area-real-estate-types").getContext("2d");
                    window.myPolarArea = new Chart(ctx).Pie(realEstateTypes, {
                        responsive: true
                    });

                }

                if (document.getElementById("chart-area-construction-types")) {

                    let ctx = document.getElementById("chart-area-construction-types").getContext("2d");
                    window.myPolarArea = new Chart(ctx).Pie(constructionTypes, {
                        responsive: true
                    });

                }
            });
    }


    startStatistics();

    setInterval(function () {
        startStatistics();
    }, 300000);

}());