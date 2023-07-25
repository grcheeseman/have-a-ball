"""empty message

Revision ID: 099b5d79b173
Revises: 438717ac7d7d
Create Date: 2023-07-25 14:12:57.350918

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '099b5d79b173'
down_revision = '438717ac7d7d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('event_dates', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.DATE(),
               type_=sa.String(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('event_dates', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.String(),
               type_=sa.DATE(),
               existing_nullable=True)

    # ### end Alembic commands ###
