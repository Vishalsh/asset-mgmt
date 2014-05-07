require 'spec_helper'

describe AssetTypesController do

  describe "GET #index" do
    it 'should render the asset_types' do
      get :index
      asset_type = FactoryGirl.create(:valid_asset_type);
      assigns(:asset_types).should include(asset_type)
    end
  end

end
