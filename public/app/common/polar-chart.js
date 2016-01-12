(function () {
    'use strict';

    $.ajax({
            url: 'http://localhost:6969/statistics'
        })
        .then(function (statistics) {

            var data = [
                {
                    value: statistics.stats.forRent,
                    color: "#F7464A",
                    highlight: "#FF5A5E",
                    label: "For Rent"
                },
                {
                    value: statistics.stats.forSale,
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "For Sale"
                },
            ];

            if (document.getElementById("chart-area")) {

                var ctx = document.getElementById("chart-area").getContext("2d");
                window.myPolarArea = new Chart(ctx).Pie(data, {
                    responsive: true
                });

            }
        });
}());