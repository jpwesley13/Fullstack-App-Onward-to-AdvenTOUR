"""Add Biome table and relationships.

Revision ID: 8fc23881a809
Revises: 8523e1f37471
Create Date: 2024-08-29 16:53:22.945871

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8fc23881a809'
down_revision = '8523e1f37471'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('biomes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_biomes'))
    )
    with op.batch_alter_table('trainers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('biome_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_trainers_biome_id_biomes'), 'biomes', ['biome_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trainers', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_trainers_biome_id_biomes'), type_='foreignkey')
        batch_op.drop_column('biome_id')

    op.drop_table('biomes')
    # ### end Alembic commands ###
