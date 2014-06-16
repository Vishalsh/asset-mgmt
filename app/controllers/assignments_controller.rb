class AssignmentsController < ApplicationController

  def index
    @assignments = Assignment.all
    respond_to do |format|
      format.json { render json: @assignments }
    end
  end

  def create
    assignment = Assignment.new(start_date: params[:assignment][:start_date], end_date: params[:assignment][:end_date], assigned_to: params[:assignment][:assigned_to])
    if assignment.save
      respond_to do |format|
        format.json { render json: assignment, status: :created }
      end
    else
      respond_to do |format|
        format.json { render json: assignment.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    @assignment = Assignment.find(params[:id])
    respond_to do |format|
      format.json { render json: @assignment, status: :ok }
    end
  end


  def show
    assignment = Assignment.find(params[:id])
    respond_to do |format|
      format.json { render json: assignment, status: :created }
    end
  end

  def update
    @assignment = Assignment.find(params[:id])
    if @assignment.update_attributes(start_date: params[:assignment][:start_date], end_date: params[:assignment][:end_date], assigned_to: params[:assignment][:assigned_to])
      respond_to do |format|
        format.json { render json: @assignment, status: :ok }
      end
    else
      respond_to do |format|
        format.json { render json: @assignment.errors, status: :unprocessable_entity }
      end
    end

  end

  def destroy
    assignment = Assignment.find(params[:id])
    assignment.destroy
    respond_to do |format|
      format.json { render json: assignment, status: :ok }
    end
  end

end
