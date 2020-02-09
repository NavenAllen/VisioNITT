import functools
import os

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from flask import Response
from flask import current_app as app

from datetime import datetime
from visionitt.db import get_db
from visionitt.faceRecog.face_crop import face_recog

bp = Blueprint('gate', __name__, url_prefix='/gate')

@bp.route('/vehicleEntry', methods=('GET', 'POST'))
def vehicleEntry():
    if request.method == 'POST':
        name = request.form.get('name')
        purpose_of_visit = request.form.get('purposeOfVisit')
        vehicle_number = request.form.get('vehicleNumber')
        origin = request.form.get('from')
        dest = request.form.get('to')
        is_nitt = request.form.get('isNitt')
        rfid = request.form.get('rfid')
        vehicle_number_image = request.form.get('vehicleNumberImage')
        
        current_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        vehicle_image = request.files.get('vehicleImage')
        filename = name+'-'+vehicle_number+'-'+current_datetime+'-Vehicle.jpg' 
        vehicle_image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        vehicle_image_path = "uploads/"+filename
        face_image = request.files.get('faceImage')
        face_filename = name+'-'+current_datetime+'-Face.jpg' 
        face_image.save(os.path.join(app.config['UPLOAD_FOLDER'], face_filename))
        face_image_path = "uploads/"+face_filename

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
                (name, purpose_of_visit, origin, dest, face_image_path,is_nitt, rfid, 1, datetime.now().strftime('%Y-%m-%d %H:%M:%S'), 0, vehicle_number, vehicle_image_path, vehicle_number_image, 'Car')
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
        ' ORDER BY entry_time DESC'
    ).fetchall()
    return render_template('base.html', entries=entries)

@bp.route('/video_feed')
def video_feed():
    return Response(face_recog(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
