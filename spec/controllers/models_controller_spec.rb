require 'spec_helper'

describe ModelsController do

  describe 'GET #index' do

    it 'should render the companies' do
      get :index, format: :json
      model = FactoryGirl.create(:valid_model);
      assigns(:models).should include(model)
    end

  end

  describe 'POST #create' do

    describe 'With valid attributes' do

      it 'should create a new comapny' do
        expect { post :create, model: FactoryGirl.attributes_for(:valid_model), format: :json }.to change(Model, :count).by(1)
      end

      it 'renders the created model as json' do
        valid_model = FactoryGirl.build(:valid_model)
        post :create, model: valid_model, format: :json
        response.body.should include (valid_model.name)
      end

      it 'respond with a 201' do
        post :create, model: FactoryGirl.attributes_for(:valid_model), format: :json
        response.status.should eq(201)
      end

    end

    describe 'with invalid attributes' do

      it 'should not create a new model' do
        expect { post :create, model: FactoryGirl.attributes_for(:invalid_model), format: :json }.to change(Model, :count).by(0)
      end

      it 'should render the errors as json' do
        post :create, model: FactoryGirl.attributes_for(:invalid_model), format: :json
        expect(response.body).to eq("{\"name\":[\"can't be blank\"]}")
      end

      it 'respond with a 422' do
        post :create, model: FactoryGirl.attributes_for(:invalid_model), format: :json
        response.status.should eq(422)
      end

    end

  end

  describe 'GET #edit' do

    before(:each) do
      @model = FactoryGirl.create(:valid_model)
    end

    it 'should get the correct model' do
      get :edit, id: @model.id, format: :json
      controller.instance_variable_get(:@model).should == @model
    end

    it 'renders the model as json' do
      get :edit, id: @model.id, format: :json
      response.body.should include (@model.name)
    end

    it 'respond with a 200' do
      get :edit, id: @model.id, format: :json
      response.status.should eq(200)
    end

  end

  describe 'PUT #update' do

    describe 'With valid attributes' do

      before(:each) do
        @model = FactoryGirl.create(:valid_model)
        @valid_model = FactoryGirl.attributes_for(:valid_model, name: 'Apple')
      end

      it 'should update an existing asset type' do
        put :update, model: @valid_model, id: @model._id, format: :json
        controller.instance_variable_get(:@model)[:name].should == @valid_model[:name]
      end

      it 'renders the updated asset_type as json' do
        put :update, model: @valid_model, id: @model._id, format: :json
        response.body.should include (@valid_model[:name])
      end

      it 'respond with a 200' do
        put :update, model: @valid_model, id: @model._id, format: :json
        response.status.should eq(200)
      end

    end

    describe 'with invalid attributes' do

      before(:each) do
        @model = FactoryGirl.create(:valid_model)
        @invalid_model = FactoryGirl.attributes_for(:valid_model, name: '')
      end

      it 'should not update an existing asset type' do
        put :update, model: @invalid_model, id: @model._id, format: :json
        controller.instance_variable_get(:@model)[:name].should == @invalid_model[:name]
      end

      it 'should render the errors as json' do
        put :update, model: @invalid_model, id: @model._id, format: :json
        expect(response.body).to eq("{\"name\":[\"can't be blank\"]}")
      end

      it 'respond with a 422' do
        put :update, model: @invalid_model, id: @model._id, format: :json
        response.status.should eq(422)
      end

    end

  end

  describe 'DELETE #destroy' do

    before(:each) do
      @model = FactoryGirl.create(:valid_model)
    end

    it 'should delete an asset type' do
      expect { delete :destroy, id: @model._id, format: :json }.to change(Model, :count).by(-1)
    end

    it 'should render the deleted asset type' do
      delete :destroy, id: @model._id, format: :json
      response.body.should include (@model[:name])
    end

    it 'respond with a 200' do
      delete :destroy, id: @model._id, format: :json
      response.status.should eq(200)
    end

  end

end
