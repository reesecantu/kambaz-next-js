export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">
        <h3>Assignment Name</h3>
      </label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description" rows={6} cols={50}>
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assignment-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-assignment-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="NOT-ASSIGNMENTS">NOT ASSIGNMENTS</option>
              <option value="MAYBE-ASSIGNMENTS">MAYBE ASSIGNMENTS</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-grade-display">Display Grade as</label>
          </td>
          <td>
            <select id="wd-grade-display">
              <option value="PERCENT">Percentage</option>
              <option value="POINTS-TOTAL">Points Total</option>
              <option value="HIDE-GRADE">Hide Grades</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="ONLINE">Online</option>
              <option value="IN-CLASS">In Class</option>
              <option value="BY-MAIL">By Mail</option>
            </select>
            <div>
              <label>Online Entry Options:</label>
              <br />
              <input
                type="checkbox"
                name="online-entry-option"
                id="wd-chkbox-comedy"
              />
              <label htmlFor="wd-radio-comedy">Text Entry</label>
              <br />
              <input
                type="checkbox"
                name="online-entry-option"
                id="wd-chkbox-drama"
              />
              <label htmlFor="wd-radio-drama">Website URL</label>
              <br />
              <input
                type="checkbox"
                name="online-entry-option"
                id="wd-chkbox-scifi"
              />
              <label htmlFor="wd-radio-scifi">Media Recordings</label>
              <br />
              <input
                type="checkbox"
                name="online-entry-option"
                id="wd-chkbox-fantasy"
              />
              <label htmlFor="wd-radio-fantasy">Student Annotation</label>
              <br />
              <input
                type="checkbox"
                name="online-entry-option"
                id="wd-chkbox-fantasy"
              />
              <label htmlFor="wd-radio-fantasy">File Upload</label>
            </div>
          </td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign">Assign</label>
          </td>
          <td>
            <div>
              <label htmlFor="wd-assign-to">Assign to</label>
              <br />
              <select id="wd-assign-to" name="wd-assign-to" multiple>
                <option value="everyone">Everyone</option>
              </select>
            </div>
            <div>
              <label htmlFor="wd-due">Due</label>
              <br />
              <input id="wd-due" type="date" />
            </div>
            <div>
              <div>
                <label htmlFor="wd-available-from">Available from</label>
                <br />
                <input id="wd-available-from" type="date" />
              </div>
              <div>
                <label htmlFor="wd-until">Until</label>
                <br />
                <input id="wd-until" type="date" />
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}
