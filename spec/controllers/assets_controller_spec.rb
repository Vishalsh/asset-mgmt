require 'spec_helper'

describe AssetsController do

  describe 'GET #index' do

    it 'should render the assets' do
      get :index, format: :json
      asset = FactoryGirl.create(:valid_asset);
      assigns(:assets).should include(asset)
    end

  end

  describe 'POST #create' do

    before(:each) do
      @asset_type = FactoryGirl.create(:valid_asset_type)
    end

    describe 'With valid attributes' do

      it 'should create a new asset type' do
        expect { post :create, asset: FactoryGirl.attributes_for(:valid_asset), asset_type: 'laptop', format: :json }.to change(Asset, :count).by(1)
      end

      it 'should assign the asset type of the created asset' do
        valid_asset = FactoryGirl.build(:valid_asset)
        post :create, asset: valid_asset, asset_type: 'laptop', format: :json
        expect(@asset_type) == (valid_asset.asset_type)
      end

      it 'renders the created asset as json' do
        valid_asset = FactoryGirl.build(:valid_asset)
        post :create, asset: valid_asset, asset_type: 'laptop', format: :json
        response.body.should include (valid_asset.invoice_number)
      end

      it 'respond with a 201' do
        post :create, asset: FactoryGirl.attributes_for(:valid_asset), asset_type: 'laptop', format: :json
        response.status.should eq(201)
      end

    end

    describe 'with invalid attributes' do

      it 'should not create a new asset type' do
        expect { post :create, asset: FactoryGirl.attributes_for(:invalid_asset), asset_type: 'laptop', format: :json }.to change(Asset, :count).by(0)
      end

      it 'should render the errors as json' do
        post :create, asset: FactoryGirl.attributes_for(:invalid_asset), asset_type: 'laptop', format: :json
        expect(response.body).to eq("{\"invoice_number\":[\"can't be blank\"]}")
      end

      it 'respond with a 422' do
        post :create, asset: FactoryGirl.attributes_for(:invalid_asset), asset_type: 'laptop', format: :json
        response.status.should eq(422)
      end

    end

  end

  describe 'GET #edit' do

    before(:each) do
      @asset = FactoryGirl.create(:valid_asset)
    end

    it 'should get the correct asset' do
      get :edit, id: @asset.id, format: :json
      controller.instance_variable_get(:@asset).should == @asset
    end

    it 'renders the asset as json' do
      get :edit, id: @asset.id, format: :json
      response.body.should include (@asset.invoice_number)
    end

    it 'respond with a 200' do
      get :edit, id: @asset.id, format: :json
      response.status.should eq(200)
    end

  end

  describe 'PUT #update' do

    describe 'With valid attributes' do

      before(:each) do
        @asset = FactoryGirl.create(:valid_asset)
        @valid_asset = FactoryGirl.attributes_for(:valid_asset, invoice_number: '43210')
      end

      it 'should update an existing asset type' do
        put :update, asset: @valid_asset, id: @asset._id, format: :json
        controller.instance_variable_get(:@asset)[:invoice_number].should == @valid_asset[:invoice_number]
      end

      it 'renders the updated asset as json' do
        put :update, asset: @valid_asset, id: @asset._id, format: :json
        response.body.should include (@valid_asset[:invoice_number])
      end

      it 'respond with a 200' do
        put :update, asset: @valid_asset, id: @asset._id, format: :json
        response.status.should eq(200)
      end

    end

    describe 'with invalid attributes' do

      before(:each) do
        @asset = FactoryGirl.create(:valid_asset)
        @invalid_asset = FactoryGirl.attributes_for(:valid_asset, invoice_number: '')
      end

      it 'should not update an existing asset type' do
        put :update, asset: @invalid_asset, id: @asset._id, format: :json
        controller.instance_variable_get(:@asset)[:invoice_number].should == @invalid_asset[:invoice_number]
      end

      it 'should render the errors as json' do
        put :update, asset: @invalid_asset, id: @asset._id, format: :json
        expect(response.body).to eq("{\"invoice_number\":[\"can't be blank\"]}")
      end

      it 'respond with a 422' do
        put :update, asset: @invalid_asset, id: @asset._id, format: :json
        response.status.should eq(422)
      end

    end

  end

  describe 'DELETE #destroy' do

    before(:each) do
      @asset = FactoryGirl.create(:valid_asset)
    end

    it 'should delete an asset type' do
      expect { delete :destroy, id: @asset._id, format: :json }.to change(Asset, :count).by(-1)
    end

    it 'should render the deleted asset type' do
      delete :destroy, id: @asset._id, format: :json
      response.body.should include (@asset[:invoice_number])
    end

    it 'respond with a 200' do
      delete :destroy, id: @asset._id, format: :json
      response.status.should eq(200)
    end

  end

end
