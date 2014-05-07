describe("asset types collection", function () {

    describe("when instantiated with model literal", function () {

        beforeEach(function () {
            this.asset_type_stub = sinon.stub(App.Models, "Asset_type");
            this.model = new Backbone.Model({
                name: 'laptop',
                properties: ['RAM', 'Hard disk']
            });
            this.asset_type_stub.returns(this.model);
            this.asset_types = new App.Collections.Asset_type;
            this.asset_types.model = App.Models.Asset_type; // reset model relationship to use stub
            this.asset_types.add({
                name: 'laptop',
                properties: ['RAM', 'Hard disk']
            });
        });

        afterEach(function () {
            App.Models.Asset_type.restore();
        });


        it("should add a model", function () {
            expect(this.asset_types.length).toEqual(1);
        });
    });

    describe("when hits the server", function () {

        beforeEach(function () {
            this.fixture = {
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
            this.server = sinon.fakeServer.create();
            this.asset_types = new App.Collections.Asset_type;
            this.server.respondWith(
                "GET",
                "/asset_types",
                [
                    200,
                    {"Content-Type": "application/json"},
                    JSON.stringify(this.fixture)
                ]
            );
        });

        afterEach(function () {
            this.server.restore();
        });

        it("should make the correct request", function () {
            this.asset_types.fetch();
            expect(this.server.requests.length).toEqual(1);
            expect(this.server.requests[0].method).toEqual("GET");
            expect(this.server.requests[0].url).toEqual("/asset_types");
        });

        it("should parse asset types from the response", function () {
            this.asset_types.fetch();
            this.server.respond();
            expect(this.asset_types.length).toEqual(this.fixture.Asset_types.valid.response.asset_types.length);
            expect(this.asset_types.models[0].attributes.name).toEqual(this.fixture.Asset_types.valid.response.asset_types[0].name);
        });

    });


});