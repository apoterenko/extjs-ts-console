/**
 * @class ManagementConsole.data.proxy.RestProxy
 *
 * The class that dynamically redefines the url of the resource according to the pattern and allows use REST protocol more flexibly.
 *
 * Key features:
 * 1. Dynamic parameterization url depending on the input parameters of business logic based on REST protocol specification of the server side.
 * 2. Etag-caching resources.
 */
Ext.define('ManagementConsole.data.proxy.RestProxy', {
    extend: 'Ext.data.proxy.Rest',

    /**
     * @inheritdoc
     */
    alias: 'proxy.restproxy',

    /**
     * Etag header name
     */
    etagHeaderName: 'If-None-Match',

    /**
     * @inheritdoc
     */
    statics: {

        /**
         * @private
         */
        etagsCache: {},

        /**
         * @private
         * @param originalUrl Original url
         * @returns {*} ETag value
         */
        getEtag: function (originalUrl) {
            var etag = this.etagsCache[originalUrl];

            Ext.log({msg: '[REST_PROXY]: get etag'}, ' >> url: ' + originalUrl + ', etag value: ' + (etag ? etag.value : null));
            return etag;
        },

        /**
         * @private
         * @param originalUrl Original url
         * @param etag ETag value
         * @param responseText Response text value
         */
        setEtag: function (originalUrl, etag, responseText) {
            Ext.log({msg: '[REST_PROXY]: set etag'}, ' >> url: ' + originalUrl + ', etag value: ' + etag);

            this.etagsCache[originalUrl] = {
                value: etag,
                responseText: responseText
            };
        }
    },

    /**
     * @inheritdoc
     */
    actionMethods: {
        create: 'POST',
        read: 'GET',
        update: 'PUT',
        destroy: 'DELETE'
    },

    /**
     * @private
     */
    inject: [
        'restConfig'
    ],

    /**
     * @inheritdoc
     */
    config: {
        /**
         * Rest config
         * @private
         */
        restConfig: null,

        /**
         * @inheritdoc
         */
        noCache: false
    },

    /**
     * @inheritdoc
     */
    appendId: false,

    /**
     * @inheritdoc
     */
    constructor: function () {
        this.withCredentials = this.cors !== false;

        this.callParent(arguments);
    },

    /**
     * @inheritdoc
     */
    buildUrl: function (request) {
        var restConfig = this.getRestConfig(),
            originalUrl = this.buildOriginalUrl(this.callParent(arguments), request);

        this.setEtagHeader(request.__originalUrl = originalUrl);

        return [
            this.withCredentials && restConfig.getHost() || '',
            restConfig.getApi(),
            restConfig.getVersion(),
            originalUrl
        ].join('/');
    },

    /**
     * @inheritdoc
     */
    processResponse: function (success, operation, request, response) {
        var etag,
            etagValue,
            originalUrl = request.__originalUrl,
            isNotModified = response.status === 304;

        if (success) {
            etagValue = response.getResponseHeader('ETag');

            if (originalUrl) {
                if (isNotModified) {
                    etagValue = etagValue || this.getEtagHeader(request);

                    if (etagValue) {
                        /**
                         * Restore responseText from local cache
                         */
                        etag = this.statics().getEtag(originalUrl);
                        etag && (response.responseText = etag.responseText);
                    }
                } else if (etagValue) {
                    this.statics().setEtag(originalUrl, etagValue, response.responseText);
                }
            }
        }
        return this.callParent(arguments);
    },

    /**
     * @private
     * @param {String} url Url
     * @param {Object} request Request
     */
    buildOriginalUrl: function (url, request) {
        var params = Ext.clone(request.getParams()),
            records = request.getRecords();

        if (records && records.length) {
            // Batch is not supported by the proxy
            Ext.apply(params, records[0].data);
        }

        return url.replace(/\{(.+)\}/, function (str, field) {
            if (params && params.hasOwnProperty(field)) {
                return params[field];
            }
            return field;
        });
    },

    /**
     * @private
     * @param{String} url Url
     */
    setEtagHeader: function (url) {
        var etag = this.statics().getEtag(url);

        if (etag) {
            this.headers = this.headers || {};
            this.headers[this.etagHeaderName] = etag.value;
        }
    },

    /**
     * @private
     * @param{Object} request Request
     * @returns Etag header value
     */
    getEtagHeader: function (request) {
        var headers = request.getHeaders();
        return headers ? headers[this.etagHeaderName] : null;
    }
});