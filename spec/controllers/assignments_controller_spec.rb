require 'spec_helper'

describe AssignmentsController do

  describe 'GET #index' do

    it 'should render the assignments' do
      get :index, format: :json
      assignment = FactoryGirl.create(:valid_assignment);
      assigns(:assignments).should include(assignment)
    end

  end

  describe 'POST #create' do

    describe 'With valid attributes' do

      it 'should create a new asset type' do
        expect { post :create, assignment: FactoryGirl.attributes_for(:valid_assignment), format: :json }.to change(Assignment, :count).by(1)
      end

      it 'renders the created assignment as json' do
        valid_assignment = FactoryGirl.build(:valid_assignment)
        post :create, assignment: valid_assignment, format: :json
        response.body.should include (valid_assignment.assigned_to)
      end

      it 'respond with a 201' do
        post :create, assignment: FactoryGirl.attributes_for(:valid_assignment), format: :json
        response.status.should eq(201)
      end

    end

    describe 'with invalid attributes' do

      it 'should not create a new asset type' do
        expect { post :create, assignment: FactoryGirl.attributes_for(:invalid_assignment), format: :json }.to change(Assignment, :count).by(0)
      end

      it 'should render the errors as json' do
        post :create, assignment: FactoryGirl.attributes_for(:invalid_assignment), format: :json
        expect(response.body).to eq("{\"assigned_to\":[\"can't be blank\"]}")
      end

      it 'respond with a 422' do
        post :create, assignment: FactoryGirl.attributes_for(:invalid_assignment), format: :json
        response.status.should eq(422)
      end

    end

  end

  describe 'GET #edit' do

    before(:each) do
      @assignment = FactoryGirl.create(:valid_assignment)
    end

    it 'should get the correct assignment' do
      get :edit, id: @assignment.id, format: :json
      controller.instance_variable_get(:@assignment).should == @assignment
    end

    it 'renders the assignment as json' do
      get :edit, id: @assignment.id, format: :json
      response.body.should include (@assignment.assigned_to)
    end

    it 'respond with a 200' do
      get :edit, id: @assignment.id, format: :json
      response.status.should eq(200)
    end

  end

  describe 'PUT #update' do

    describe 'With valid attributes' do

      before(:each) do
        @assignment = FactoryGirl.create(:valid_assignment)
        @valid_assignment = FactoryGirl.attributes_for(:valid_assignment, assigned_to: '22-07-2014')
      end

      it 'should update an existing asset type' do
        put :update, assignment: @valid_assignment, id: @assignment._id, format: :json
        controller.instance_variable_get(:@assignment)[:assigned_to].should == @valid_assignment[:assigned_to]
      end

      it 'renders the updated assignment as json' do
        put :update, assignment: @valid_assignment, id: @assignment._id, format: :json
        response.body.should include (@valid_assignment[:assigned_to])
      end

      it 'respond with a 200' do
        put :update, assignment: @valid_assignment, id: @assignment._id, format: :json
        response.status.should eq(200)
      end

    end

    describe 'with invalid attributes' do

      before(:each) do
        @assignment = FactoryGirl.create(:valid_assignment)
        @invalid_assignment = FactoryGirl.attributes_for(:valid_assignment, assigned_to: '')
      end

      it 'should not update an existing asset type' do
        put :update, assignment: @invalid_assignment, id: @assignment._id, format: :json
        controller.instance_variable_get(:@assignment)[:assigned_to].should == @invalid_assignment[:assigned_to]
      end

      it 'should render the errors as json' do
        put :update, assignment: @invalid_assignment, id: @assignment._id, format: :json
        expect(response.body).to eq("{\"assigned_to\":[\"can't be blank\"]}")
      end

      it 'respond with a 422' do
        put :update, assignment: @invalid_assignment, id: @assignment._id, format: :json
        response.status.should eq(422)
      end

    end

  end

  describe 'DELETE #destroy' do

    before(:each) do
      @assignment = FactoryGirl.create(:valid_assignment)
    end

    it 'should delete an asset type' do
      expect { delete :destroy, id: @assignment._id, format: :json }.to change(Assignment, :count).by(-1)
    end

    it 'should render the deleted asset type' do
      delete :destroy, id: @assignment._id, format: :json
      response.body.should include (@assignment[:assigned_to])
    end

    it 'respond with a 200' do
      delete :destroy, id: @assignment._id, format: :json
      response.status.should eq(200)
    end

  end

end
