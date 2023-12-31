"""empty message

Revision ID: 438717ac7d7d
Revises: 
Create Date: 2023-07-25 13:52:08.548095

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "438717ac7d7d"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "events",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("picture", sa.String(), nullable=True),
        sa.Column("bio", sa.String(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "knitters",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("username", sa.String(), nullable=False),
        sa.Column("_password_hash", sa.String(), nullable=True),
        sa.Column("picture", sa.String(), nullable=True),
        sa.Column("bio", sa.String(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("username"),
    )
    op.create_table(
        "event_dates",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("date", sa.Date(), nullable=True),
        sa.Column("event_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["event_id"],
            ["events.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "projects",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("picture", sa.String(), nullable=True),
        sa.Column("body", sa.String(), nullable=True),
        sa.Column("likes", sa.Integer(), nullable=True),
        sa.Column("knitter_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["knitter_id"],
            ["knitters.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "knitter_event_dates",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("knitter_id", sa.Integer(), nullable=True),
        sa.Column("event_date_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["event_date_id"],
            ["event_dates.id"],
        ),
        sa.ForeignKeyConstraint(
            ["knitter_id"],
            ["knitters.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("knitter_event_dates")
    op.drop_table("projects")
    op.drop_table("event_dates")
    op.drop_table("knitters")
    op.drop_table("events")
    # ### end Alembic commands ###
