class ListItem < ActiveRecord::Base
  belongs_to :list
  default_scope { order(:rank) }
  before_create :calc_rank

  # This method associates the attribute ":image_main" with a file attachment
  has_attached_file :image_main, styles: {
    thumb: '100x100>',
    square: '200x200#',
    medium: '300x300>'
  }

  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :image_main, :content_type => /\Aimage\/.*\Z/

  def move_to(new_rank)
    if new_rank < rank then
      sql = "UPDATE list_items
              SET rank = rank + 1
              WHERE list_id = #{list.id}
              AND rank >= #{new_rank}
              AND rank <= #{rank}"
    else
      sql = "UPDATE list_items
              SET rank = rank - 1
              WHERE list_id = #{list.id}
              AND rank <= #{new_rank}
              AND rank >= #{rank}"
    end

    ActiveRecord::Base.connection.execute(sql)
    self.rank = new_rank
    save
  end

  def calc_rank
    self.rank = self.list.list_items.last ? self.list.list_items.last.rank + 1 : 0
  end

end
