class ListItem < ActiveRecord::Base
  belongs_to :list
  default_scope { order(:rank) }
  before_create :calc_rank

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
