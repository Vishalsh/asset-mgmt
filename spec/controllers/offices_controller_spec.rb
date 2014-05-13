require 'spec_helper'

describe OfficesController do

  describe 'GET #index' do

    it 'should render the companies' do
      get :index, format: :json
      office = FactoryGirl.create(:valid_office);
      assigns(:offices).should include(office)
    end

  end

  describe 'POST #create' do

    describe 'With valid attributes' do

      it 'should create a new comapny' do
        expect { post :create, office: FactoryGirl.attributes_for(:valid_office), format: :json }.to change(Office, :count).by(1)
      end

      it 'renders the created office as json' do
        valid_office = FactoryGirl.build(:valid_office)
        post :create, office: valid_office, format: :json
        response.body.should include (valid_office.name)
      end

      it 'respond with a 201' do
        post :create, office: FactoryGirl.attributes_for(:valid_office), format: :json
        response.status.should eq(201)
      end

    end

    describe 'with invalid attributes' do

      it 'should not create a new office' do
        expect { post :create, office: FactoryGirl.attributes_for(:invalid_office), format: :json }.to change(Office, :count).by(0)
      end

      it 'should render the errors as json' do
        post :create, office: FactoryGirl.attributes_for(:invalid_office), format: :json
        expect(response.body).to eq("{\"name\":[\"can't be blank\"]}")
      end

      it 'respond with a 422' do
        post :create, office: FactoryGirl.attributes_for(:invalid_office), format: :json
        response.status.should eq(422)
      end

    end

  end

  describe 'GET #edit' do

    before(:each) do
      @office = FactoryGirl.create(:valid_office)
    end

    it 'should get the correct office' do
      get :edit, id: @office.id, format: :json
      controller.instance_variable_get(:@office).should == @office
    end

    it 'renders the office as json' do
      get :edit, id: @office.id, format: :json
      response.body.should include (@office.name)
    end

    it 'respond with a 200' do
      get :edit, id: @office.id, format: :json
      response.status.should eq(200)
    end

  end
  
  describe 'PUT #update' do

    describe 'With valid attributes' do

      before(:each) do
        @office = FactoryGirl.create(:valid_office)
        @valid_office = FactoryGirl.attributes_for(:valid_office, name: 'Apple')
      end

      it 'should update an existing asset type' do
        put :update, office: @valid_office, id: @office._id, format: :json
        controller.instance_variable_get(:@office)[:name].should == @valid_office[:name]
      end

      it 'renders the updated asset_type as json' do
        put :update, office: @valid_office, id: @office._id, format: :json
        response.body.should include (@valid_office[:name])
      end

      it 'respond with a 200' do
        put :update, office: @valid_office, id: @office._id, format: :json
        response.status.should eq(200)
      end

    end

    describe 'with invalid attributes' do

      before(:each) do
        @office = FactoryGirl.create(:valid_office)
        @invalid_office = FactoryGirl.attributes_for(:valid_office, name: '')
      end

      it 'should not update an existing asset type' do
        put :update, office: @invalid_office, id: @office._id, format: :json
        controller.instance_variable_get(:@office)[:name].should == @invalid_office[:name]
      end

      it 'should render the errors as json' do
        put :update, office: @invalid_office, id: @office._id, format: :json
        expect(response.body).to eq("{\"name\":[\"can't be blank\"]}")
      end

      it 'respond with a 422' do
        put :update, office: @invalid_office, id: @office._id, format: :json
        response.status.should eq(422)
      end

    end

  end

  describe 'DELETE #destroy' do

    before(:each) do
      @office = FactoryGirl.create(:valid_office)
    end

    it 'should delete an asset type' do
      expect { delete :destroy, id: @office._id, format: :json }.to change(Office, :count).by(-1)
    end

    it 'should render the deleted asset type' do
      delete :destroy, id: @office._id, format: :json
      response.body.should include (@office[:name])
    end

    it 'respond with a 200' do
      delete :destroy, id: @office._id, format: :json
      response.status.should eq(200)
    end

  end

end
