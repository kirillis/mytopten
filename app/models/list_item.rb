class ListItem < ActiveRecord::Base
  belongs_to :list, touch: true
  default_scope { order(:rank) }
  before_create :calc_rank

  # This method associates the attribute ":image_main" with a file attachment
  has_attached_file :image_main,
                    styles: {
                      thumb: '150x150>',
                      medium: '200x200#'
                    },
                    :convert_options => {
                      :thumb => '-quality 80 -strip',
                      :medium => '-quality 80 -strip'
                    }

  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :image_main, :content_type => /\Aimage\/.*\Z/

  # Validate filename
  validates_attachment_file_name :image_main, :matches => [/png\Z/, /jpe?g\Z/]


  def image_thumb
    self.image_thumb_url ? self.image_thumb_url : self.image_main.url(:thumb)
  end

  def image_large
    self.image_large_url ? self.image_large_url : self.image_main.url
  end

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
