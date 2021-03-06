class BookingsController < ApplicationController
  def create
    @booking = Booking.new(
      skivent: Skivent.find(params[:skivent_id]),
      user: current_user,
      status: "pending"
    )
    @booking.save!
    flash[:notice] = "The Skivent has been booked!"
    redirect_to user_path(current_user)
  end

  def edit
    @booking = Booking.find(params[:id])
  end

  def update
    @booking = Booking.find(params[:id])
    if params[:booking][:status] == "accepted"
      flash[:notice] = "The request has been accepted!"
      @booking.update!(status: "accepted")
    elsif params[:booking][:status] == "declined"
      flash[:notice] = "The request has been declined!"
      @booking.update!(status: "declined")
    end
    redirect_to user_path(@booking.skivent.user)
  end

  private

  def booking_params
    params.require(:booking).permit(:skivent_id)
  end
end
