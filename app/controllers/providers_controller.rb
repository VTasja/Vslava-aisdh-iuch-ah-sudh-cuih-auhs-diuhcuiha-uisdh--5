class ProvidersController < ApplicationController
  def index
    @providers = Provider.all
    @fields = [ \
      { property: 'name', title: 'Name' }, \
      { property: 'percent', title: 'Percent' } \
    ]

    respond_to do |format|
      format.html
      format.json do
        render json: {
          title: 'Providers',
          fields: @fields,
          records: @providers
        }
      end
    end
  end

  def create
  end

  def update
    @provider = Provider.find(params[:id])
    if @provider.update(record_params)
      render json: @provider
    else
      render json: @provider.errors, status: :unprocessable_entity
    end
  end

  private

  def record_params
    params.require(:provider).permit(:name, :percent)
  end
end
