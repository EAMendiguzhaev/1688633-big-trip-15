import EventView from '../event.js';
import EditPointView from '../edit-point.js';
import { render, remove, replace, RenderPosition } from '../utils/render.js';
import { isEscEvent } from '../utils/common.js';

const Mode = {
  EDITING: 'EDITING',
  DEFAULT: 'DEFAULT',
};

class Point {
  constructor(pointListContainer, changeData, changeMode) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._editPointComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormClose = this._handleFormClose.bind(this);
    this._escDownHandler = this._escDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._eventComponent;
    const prevEditPointComponent = this._editPointComponent;

    this._eventComponent = new EventView(point);
    this._editPointComponent = new EditPointView(point);

    this._eventComponent.setPointOpenHandler(this._handleEditClick);
    this._editPointComponent.setFormCloseHandler(this._handleFormClose);
    this._editPointComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevEditPointComponent === null || prevPointComponent === null) {
      render(this._pointListContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._editPointComponent, prevEditPointComponent);
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._editPointComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditFormToPoint();
    }
  }

  _replacePointToEditForm() {
    replace(this._editPointComponent, this._eventComponent);
    document.addEventListener('keydown', this._escDownHandler);

    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceEditFormToPoint() {
    replace(this._eventComponent, this._editPointComponent);
    document.removeEventListener('keydown', this._escDownHandler);

    this._mode = Mode.DEFAULT;
  }

  _escDownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._replaceEditFormToPoint();
    }
  }

  _handleEditClick() {
    this._replacePointToEditForm();
  }

  _handleFormSubmit(point) {
    this._changeData(point);
    this._replaceEditFormToPoint();
  }

  _handleFormClose() {
    this._replaceEditFormToPoint();
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign({}, this._point, {
        isFavorite: !this._point.isFavorite,
      }),
    );
  }
}

export default Point;
