"""empty message

Revision ID: 2333857fa3e2
Revises: 9ad67d223344
Create Date: 2023-08-09 09:50:30.640899

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2333857fa3e2'
down_revision = '9ad67d223344'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('knitter_event_dates', schema=None) as batch_op:
        batch_op.create_unique_constraint('knitter_event_date_unique', ['knitter_id', 'event_date_id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('knitter_event_dates', schema=None) as batch_op:
        batch_op.drop_constraint('knitter_event_date_unique', type_='unique')

    # ### end Alembic commands ###
