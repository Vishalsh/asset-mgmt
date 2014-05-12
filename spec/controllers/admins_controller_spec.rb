require 'spec_helper'

describe AdminsController do

  describe 'GET #index' do
    it 'should render the admins' do
      get :index, format: :json
      admin = FactoryGirl.create(:valid_admin);
      assigns(:admins).should include(admin)
    end
  end

  describe 'POST #create' do

    describe 'With valid attributes' do

      it 'should create a new admin' do
        expect { post :create, admin: FactoryGirl.attributes_for(:valid_admin), format: :json }.to change(Admin, :count).by(1)
      end

      it 'renders the created admin as json' do
        valid_admin = FactoryGirl.build(:valid_admin)
        post :create, admin: valid_admin, format: :json
        response.body.should include (valid_admin.name)
      end

      it 'respond with a 201' do
        post :create, admin: FactoryGirl.attributes_for(:valid_admin), format: :json
        response.status.should eq(201)
      end

    end

    describe 'with invalid attributes' do

      it 'should not create a new admin' do
        expect { post :create, admin: FactoryGirl.attributes_for(:invalid_admin), format: :json }.to change(Admin, :count).by(0)
      end

      it 'should render the errors as json' do
        post :create, admin: FactoryGirl.attributes_for(:invalid_admin), format: :json
        expect(response.body).to eq("{\"ad_id\":[\"can't be blank\"]}")
      end

      it 'respond with a 422' do
        post :create, admin: FactoryGirl.attributes_for(:invalid_admin), format: :json
        response.status.should eq(422)
      end

    end

  end

  describe 'PUT #update' do

    describe 'With valid attributes' do

      before(:each) do
        @admin = FactoryGirl.create(:valid_admin)
        @valid_admin = FactoryGirl.attributes_for(:valid_admin, name: 'keyboard')
      end

      it 'should update an existing asset type' do
        put :update, admin: @valid_admin, id: @admin._id, format: :json
        controller.instance_variable_get(:@admin)[:name].should == @valid_admin[:name]
      end

      it 'renders the updated asset_type as json' do
        put :update, admin: @valid_admin, id: @admin._id, format: :json
        response.body.should include (@valid_admin[:name])
      end

      it 'respond with a 200' do
        put :update, admin: @valid_admin, id: @admin._id, format: :json
        response.status.should eq(200)
      end

    end

    describe 'with invalid attributes' do

      before(:each) do
        @admin = FactoryGirl.create(:valid_admin)
        @invalid_admin = FactoryGirl.attributes_for(:valid_admin, name: '')
      end

      it 'should not update an existing asset type' do
        put :update, admin: @invalid_admin, id: @admin._id, format: :json
        controller.instance_variable_get(:@admin)[:name].should == @invalid_admin[:name]
      end

      it 'should render the errors as json' do
        put :update, admin: @invalid_admin, id: @admin._id, format: :json
        expect(response.body).to eq("{\"name\":[\"can't be blank\"]}")
      end

      it 'respond with a 422' do
        put :update, admin: @invalid_admin, id: @admin._id, format: :json
        response.status.should eq(422)
      end

    end

  end

  describe 'DELETE #destroy' do

    before(:each) do
      @admin = FactoryGirl.create(:valid_admin)
    end

    it 'should delete an asset type' do
      expect { delete :destroy, id: @admin._id, format: :json }.to change(Admin, :count).by(-1)
    end

    it 'should render the deleted asset type' do
      delete :destroy, id: @admin._id, format: :json
      response.body.should include (@admin[:name])
    end

    it 'respond with a 200' do
      delete :destroy, id: @admin._id, format: :json
      response.status.should eq(200)
    end

  end

end
