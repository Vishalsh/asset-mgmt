describe("Asset type Model", function () {

    beforeEach(function () {
        App.Models.Asset_type = new Backbone.Model({
            name: 'laptop',
            properties: ['RAM', 'Hard disk']
        });
    });

    it('should expose the asset_type attributes', function () {
        expect(App.Models.Asset_type.get('name')).toEqual('laptop');
        expect(App.Models.Asset_type.get('properties')).toEqual(['RAM', 'Hard disk']);
    });

    it("should set the URL to the collection URL", function() {
        App.Collections.Asset_type = {
            url: "/asset_type"
        };
        expect(App.Collections.Asset_type.url).toEqual("/asset_type");
    });

});