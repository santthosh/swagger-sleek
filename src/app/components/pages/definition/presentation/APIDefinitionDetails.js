import React, {Component, PropTypes} from 'react';
import MarkdownElement from '../../../presentation/MarkdownElement';
import APIOperationDetails from './APIOperationDetails';
var Scroll = require('react-scroll');
var scroller = Scroll.scroller;

class APIDefinitionDetails extends Component {

    static propTypes = {
        definitions: PropTypes.object.isRequired,
        url: PropTypes.string.isRequired,
        operation:PropTypes.string
    };

    componentWillUpdate() {
        console.log('componentWillUpdate ' + this.props.operation);
        if(this.props.operation) {
            scroller.scrollTo(this.props.operation, {
                duration: 1500,
                delay: 1,
                offset:100,
                smooth: true,
            });
        }
    };

    handleInfo() {
        var definition = this.props.definitions[this.props.url];
        return (definition && definition.swagger.info) ?
            <MarkdownElement text={"## " + definition.name + "\n ### " +
                definition.swagger.info.title + "\n" + definition.swagger.info.description} /> :
            <MarkdownElement text={"## 404"} />;
    }

    handleOperations(tag,definition) {
        var items = [];
        if(definition) {
            var paths = definition.swagger.paths;
            for (var path in paths) {
                if (paths.hasOwnProperty(path)) {
                    var methods = paths[path];
                    for(var key in methods) {
                        var tags = methods[key].tags;
                        if(methods.hasOwnProperty(key) && tags.indexOf(tag) > -1) {
                            var unique = key + ' ' + path;
                            items.push(
                                <APIOperationDetails key={unique}
                                                     definition={definition}
                                                     path={path}
                                                     method={key}/>
                            )
                        }
                    }
                }
            }
        }
        return items;
    }

    handleTags() {
        var items = [];
        var definition = this.props.definitions[this.props.url];
        if(definition) {
            var tags = definition.swagger.tags;
            for (var tag in tags) {
                if (tags.hasOwnProperty(tag)) {
                    items.push(
                        <div key={tags[tag].name}>
                            <MarkdownElement text={"### **" + tags[tag].name + "** - " + tags[tag].description + "\n ---"}/>
                            {this.handleOperations(tags[tag].name,definition)}
                        </div>
                    );
                }
            }
        }
        return items;
    }

    render() {
        return (
            <div>
                {this.handleInfo()}
                {this.handleTags()}
            </div>
        );
    }
}

export default APIDefinitionDetails;