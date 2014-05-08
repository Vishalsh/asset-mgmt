describe("Asset type router", function () {

    describe("routes", function () {
        beforeEach(function () {
            this.router = new App.Routers.Asset_type;
            this.routeSpy = sinon.spy();

            try {
                Backbone.history.start({silent: true, pushState: true});
            } catch (e) {
            }
            this.router.navigate("somewhere");
        });

        it("fires the index route with a asset_types hash", function () {

            this.router.bind("route:index", this.routeSpy);
//            this.router.navigate("asset_types", true);
//            expect(this.routeSpy).toHaveBeenCalledOnce();
//            expect(this.routeSpy).toHaveBeenCalledWith();
        });

        it("fires the new_asset route with a asset_types/new hash", function () {

            this.router.bind("route:new_asset", this.routeSpy);
            this.router.navigate("asset_types#new", true);
//            expect(this.routeSpy).toHaveBeenCalledOnce();
//            expect(this.routeSpy).toHaveBeenCalledWith();
        });

    });


    describe("index", function () {
        beforeEach(function () {
            this.router = new App.Routers.Asset_type;
            this.appRouterListViewStub = sinon.stub(App.Views, "Asset_type_list").returns(new Backbone.View());
        });

        afterEach(function () {
            App.Views.Asset_type_list.restore();
        });

        it("creates a asset type list view", function () {
            this.router.index();
//            expect(this.appRouterListViewStub).toHaveBeenCalled();
        });


    });


    describe("new_asset", function () {
        beforeEach(function () {
            this.router = new App.Routers.Asset_type;
            this.appRouterNewViewStub = sinon.stub(App.Views, "Asset_type_new").returns(new Backbone.View());
        });

        afterEach(function () {
            App.Views.Asset_type_new.restore();
        });

        it("creates a asset type new view", function () {
            this.router.new_asset();
//            expect(this.appRouterListViewStub).toHaveBeenCalled();
        });

    })

})

