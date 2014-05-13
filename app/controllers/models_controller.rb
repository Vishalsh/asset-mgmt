class ModelsController < ApplicationController

  def index
    @models = Model.all
    respond_to do |format|
      format.json { render json: @models }
    end
  end

  def create
    model = Model.new(name: params[:model][:name])
    if model.save
      respond_to do |format|
        format.json { render json: model, status: :created }
      end
    else
      respond_to do |format|
        format.json { render json: model.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    @model = Model.find(params[:id])
    respond_to do |format|
      format.json { render json: @model, status: :ok }
    end
  end

  def show
    model = Model.find(params[:id])
    respond_to do |format|
      format.json { render json: model, status: :created }
    end
  end

  def update
    @model = Model.find(params[:id])
    if @model.update_attributes(name: params[:model][:name])
      respond_to do |format|
        format.json { render json: @model, status: :ok }
      end
    else
      respond_to do |format|
        format.json { render json: @model.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    model = Model.find(params[:id])
    model.destroy
    respond_to do |format|
      format.json { render json: model, status: :ok }
    end
  end

end
