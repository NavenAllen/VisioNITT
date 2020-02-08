import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from datetime import datetime
from visionitt.db import get_db

bp = Blueprint('gate', __name__, url_prefix='/gate')

@bp.route('/vehicleEntry', methods=('GET', 'POST'))
def vehicleEntry():
    if request.method == 'POST':
        name = request.form['name']
        purpose_of_visit = request.form['purposeOfVisit']
        vehicle_number = request.form['vehicleNumber']
        origin = request.form['from']
        dest = request.form['to']
        vehicle_image = request.form['vehicleImage']
        vehicle_number_image = request.form['vehicleNumberImage']
        face_image = request.form['faceImage']
        is_nitt = request.form['isNitt']
        rfid = request.form['rfid']

        db = get_db()
        error = None

        # if not username:
        #     error = 'Username is required.'
        # elif not password:
        #     error = 'Password is required.'
        # elif db.execute(
        #     'SELECT id FROM user WHERE username = ?', (username,)
        # ).fetchone() is not None:
        #     error = 'User {} is already registered.'.format(username)

        if error is None:
            db.execute(
                'INSERT INTO person_entry (person_name, purpose_of_visit, from_dest, to_dest, face_image, is_nitt, user_id, is_vehicle, entry_time, exited, vehicle_number, vehicle_image, vehicle_number_image, vehicle_type) VALUES (?, ?, ?,?,?,?,?,?, ?, ?, ?, ?, ?, ?)',
                (name, purpose_of_visit, origin, dest, face_image,is_nitt, rfid, 1, datetime.now().strftime('%Y-%m-%d %H:%M:%S'), 0, vehicle_number, vehicle_image, vehicle_number_image, 'Car')
            )
            db.commit()
            return redirect(url_for('gate.vehicleEntry'))

        flash(error)

    return render_template('gate/vehicleEntry.html')

@bp.route('/', methods=('GET', 'POST'))
def index():
    db = get_db()
    entries = db.execute(
        'SELECT *'
        ' FROM person_entry'
    ).fetchall()
    return render_template('base.html', entries=entries)
