beforeEach(function () {

    this.fixtures = {

        Asset_types: {
            valid: { // response starts here
                "status": "OK",
                "response": {
                    "asset_types": [
                        {
                            "name": "laptop",
                            "properties": ["RAM", "Hard disk"]
                        },
                        {
                            "name": "keyboard",
                            "properties": ["Company", "Color"]
                        }
                    ]
                }
            }
        }

    };

});