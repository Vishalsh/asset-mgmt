class AssetsController < ApplicationController

  def index
    @assets = Asset.all
    respond_to do |format|
      format.json { render json: @assets }
    end
  end

  def create

    asset = Asset.new(invoice_number: params[:asset][:invoice_number], serial_number: params[:asset][:serial_number],
                      purchased_date: params[:asset][:purchased_date], mac_address: params[:asset][:mac_address],
                      warranty: params[:asset][:warranty])

    asset_type = AssetType.find_by({name: params[:asset_type]})
    asset_type_properties = asset_type.properties
    asset.asset_type = asset_type
    asset.properties = asset.create_properties_hash(asset_type_properties, params)

    if asset.save
      respond_to do |format|
        format.json { render json: asset, status: :created }
      end
    else
      respond_to do |format|
        format.json { render json: asset.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    @asset = Asset.find(params[:id])
    respond_to do |format|
      format.json { render json: @asset, status: :ok }
    end
  end


  def show
    asset = Asset.find(params[:id])
    respond_to do |format|
      format.json { render json: asset, status: :created }
    end
  end

  def update
    @asset = Asset.find(params[:id])
    if @asset.update_attributes(invoice_number: params[:asset][:invoice_number], serial_number: params[:asset][:serial_number],
                                purchased_date: params[:asset][:purchased_date], mac_address: params[:asset][:mac_address],
                                warranty: params[:asset][:warranty])
      respond_to do |format|
        format.json { render json: @asset, status: :ok }
      end
    else
      respond_to do |format|
        format.json { render json: @asset.errors, status: :unprocessable_entity }
      end
    end

  end

  def destroy
    asset = Asset.find(params[:id])
    asset.destroy
    respond_to do |format|
      format.json { render json: asset, status: :ok }
    end
  end

end
