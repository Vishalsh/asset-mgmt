require 'spec_helper'

describe CompaniesController do

  describe 'GET #index' do
    it 'should render the companies' do
      get :index, format: :json
      company = FactoryGirl.create(:valid_company);
      assigns(:companies).should include(company)
    end
  end

  describe 'POST #create' do

    describe 'With valid attributes' do

      it 'should create a new comapny' do
        expect { post :create, company: FactoryGirl.attributes_for(:valid_company), format: :json }.to change(Company, :count).by(1)
      end

      it 'renders the created company as json' do
        valid_company = FactoryGirl.build(:valid_company)
        post :create, company: valid_company, format: :json
        response.body.should include (valid_company.name)
      end

      it 'respond with a 201' do
        post :create, company: FactoryGirl.attributes_for(:valid_company), format: :json
        response.status.should eq(201)
      end

    end

    describe 'with invalid attributes' do

      it 'should not create a new company' do
        expect { post :create, company: FactoryGirl.attributes_for(:invalid_company), format: :json }.to change(Company, :count).by(0)
      end

      it 'should render the errors as json' do
        post :create, company: FactoryGirl.attributes_for(:invalid_company), format: :json
        expect(response.body).to eq("{\"name\":[\"can't be blank\"]}")
      end

      it 'respond with a 422' do
        post :create, company: FactoryGirl.attributes_for(:invalid_company), format: :json
        response.status.should eq(422)
      end

    end

  end

  describe 'PUT #update' do

    describe 'With valid attributes' do

      before(:each) do
        @company = FactoryGirl.create(:valid_company)
        @valid_company = FactoryGirl.attributes_for(:valid_company, name: 'Apple')
      end

      it 'should update an existing asset type' do
        put :update, company: @valid_company, id: @company._id, format: :json
        controller.instance_variable_get(:@company)[:name].should == @valid_company[:name]
      end

      it 'renders the updated asset_type as json' do
        put :update, company: @valid_company, id: @company._id, format: :json
        response.body.should include (@valid_company[:name])
      end

      it 'respond with a 200' do
        put :update, company: @valid_company, id: @company._id, format: :json
        response.status.should eq(200)
      end

    end

    describe 'with invalid attributes' do

      before(:each) do
        @company = FactoryGirl.create(:valid_company)
        @invalid_company = FactoryGirl.attributes_for(:valid_company, name: '')
      end

      it 'should not update an existing asset type' do
        put :update, company: @invalid_company, id: @company._id, format: :json
        controller.instance_variable_get(:@company)[:name].should == @invalid_company[:name]
      end

      it 'should render the errors as json' do
        put :update, company: @invalid_company, id: @company._id, format: :json
        expect(response.body).to eq("{\"name\":[\"can't be blank\"]}")
      end

      it 'respond with a 422' do
        put :update, company: @invalid_company, id: @company._id, format: :json
        response.status.should eq(422)
      end

    end

  end

  describe 'DELETE #destroy' do

    before(:each) do
      @company = FactoryGirl.create(:valid_company)
    end

    it 'should delete an asset type' do
      expect { delete :destroy, id: @company._id, format: :json }.to change(Company, :count).by(-1)
    end

    it 'should render the deleted asset type' do
      delete :destroy, id: @company._id, format: :json
      response.body.should include (@company[:name])
    end

    it 'respond with a 200' do
      delete :destroy, id: @company._id, format: :json
      response.status.should eq(200)
    end

  end

end
