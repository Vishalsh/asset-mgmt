require 'spec_helper'

describe AssetTypesController do

  describe 'GET #index' do
    it 'should render the asset_types' do
      get :index
      asset_type = FactoryGirl.create(:valid_asset_type);
      assigns(:asset_types).should include(asset_type)
    end
  end

  describe 'POST #create' do

    describe 'With valid attributes' do

      it 'should create a new asset type' do
        expect { post :create, asset_type: FactoryGirl.attributes_for(:valid_asset_type), format: :json }.to change(AssetType, :count).by(1)
      end

      it 'renders the created asset_type as json' do
        valid_asset_type = FactoryGirl.build(:valid_asset_type)
        post :create, asset_type: valid_asset_type, format: :json
        response.body.should include (valid_asset_type.name)
      end

      it 'respond with a 201' do
        post :create, asset_type: FactoryGirl.attributes_for(:valid_asset_type), format: :json
        response.status.should eq(201)
      end

    end

    describe 'with invalid attributes' do

      it 'should not create a new asset type' do
        expect { post :create, asset_type: FactoryGirl.attributes_for(:invalid_asset_type), format: :json }.to change(AssetType, :count).by(0)
      end

      it 'should render the errors as json' do
        post :create, asset_type: FactoryGirl.attributes_for(:invalid_asset_type), format: :json
        expect(response.body).to eq("{\"image_path\":[\"can't be blank\"]}")
      end

      it 'respond with a 422' do
        post :create, asset_type: FactoryGirl.attributes_for(:invalid_asset_type), format: :json
        response.status.should eq(422)
      end

    end

  end

  describe 'PUT #update' do

    describe 'With valid attributes' do

      before(:each) do
        @asset_type = FactoryGirl.create(:valid_asset_type)
        @valid_asset_type = FactoryGirl.attributes_for(:valid_asset_type, name: 'keyboard')
      end

      it 'should update an existing asset type' do
        put :update, asset_type: @valid_asset_type, id: @asset_type._id, format: :json
        controller.instance_variable_get(:@asset_type)[:name].should == @valid_asset_type[:name]
      end

      it 'renders the updated asset_type as json' do
        put :update, asset_type: @valid_asset_type, id: @asset_type._id, format: :json
        response.body.should include (@valid_asset_type[:name])
      end

      it 'respond with a 200' do
        put :update, asset_type: @valid_asset_type, id: @asset_type._id, format: :json
        response.status.should eq(200)
      end

    end

    describe 'with invalid attributes' do

      before(:each) do
        @asset_type = FactoryGirl.create(:valid_asset_type)
        @invalid_asset_type = FactoryGirl.attributes_for(:valid_asset_type, name: '')
      end

      it 'should not update an existing asset type' do
        put :update, asset_type: @invalid_asset_type, id: @asset_type._id, format: :json
        controller.instance_variable_get(:@asset_type)[:name].should == @invalid_asset_type[:name]
      end

      it 'should render the errors as json' do
        put :update, asset_type: @invalid_asset_type, id: @asset_type._id, format: :json
        expect(response.body).to eq("{\"name\":[\"can't be blank\"]}")
      end

      it 'respond with a 422' do
        put :update, asset_type: @invalid_asset_type, id: @asset_type._id, format: :json
        response.status.should eq(422)
      end

    end

  end

  describe 'DELETE #destroy' do

    before(:each) do
      @asset_type = FactoryGirl.create(:valid_asset_type)
    end

    it 'should delete an asset type' do
      expect { delete :destroy, id: @asset_type._id, format: :json }.to change(AssetType, :count).by(-1)
    end

    it 'should render the deleted asset type' do
      delete :destroy, id: @asset_type._id, format: :json
      response.body.should include (@asset_type[:name])
    end

    it 'respond with a 200' do
      delete :destroy, id: @asset_type._id, format: :json
      response.status.should eq(200)
    end

  end

end
