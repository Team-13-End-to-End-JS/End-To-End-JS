(function () {
    $.ajax({
            url: 'http://localhost:6969/statistics'
        })
        .then(function (statistics) {

            var data = [
                {
                    value: statistics.forSale,
                    color: "#F7464A",
                    highlight: "#FF5A5E",
                    label: "For Sale"
                },
                {
                    value: statistics.forRent,
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "For Rent"
                }
            ];

            if (document.getElementById("chart-area")) {
                console.log('in client, but nothing to shown :( ');

                var ctx = document.getElementById("chart-area").getContext("2d");
                window.myPolarArea = new Chart(ctx).Pie(data);
            }
        });
}());